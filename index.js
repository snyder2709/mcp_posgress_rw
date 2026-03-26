#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import pg from "pg";

const { Client } = pg;

const connectionString = process.argv[2];
if (!connectionString) {
  console.error("Usage: node index.js <connection-string>");
  process.exit(1);
}

const client = new Client({ connectionString });
await client.connect();

const server = new Server(
  { name: "postgres-rw", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

const sqlInputSchema = {
  type: "object",
  properties: { sql: { type: "string" } },
  required: ["sql"],
};

const textResult = (data) => ({
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
});

server.setRequestHandler(ListToolsRequestSchema, () => ({
  tools: [
    {
      name: "query",
      description: "Run a read-only SQL query (SELECT)",
      inputSchema: sqlInputSchema,
    },
    {
      name: "execute",
      description: "Execute a write SQL statement (INSERT, UPDATE, DELETE, etc.)",
      inputSchema: sqlInputSchema,
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (typeof args?.sql !== "string") {
    throw new Error("Missing or invalid 'sql' argument");
  }

  if (name === "query") {
    await client.query("BEGIN TRANSACTION READ ONLY");
    try {
      const result = await client.query(args.sql);
      return textResult(result.rows);
    } finally {
      await client.query("ROLLBACK");
    }
  }

  if (name === "execute") {
    const result = await client.query(args.sql);
    return textResult({ rowCount: result.rowCount, command: result.command });
  }

  throw new Error(`Unknown tool: ${name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
