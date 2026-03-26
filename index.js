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

const server = new Server(
  { name: "postgres-rw", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "query",
      description: "Run a read-only SQL query",
      inputSchema: {
        type: "object",
        properties: { sql: { type: "string" } },
        required: ["sql"],
      },
    },
    {
      name: "execute",
      description: "Execute a write SQL statement (INSERT, UPDATE, DELETE, etc.)",
      inputSchema: {
        type: "object",
        properties: { sql: { type: "string" } },
        required: ["sql"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const client = new Client({ connectionString });
  await client.connect();

  try {
    if (name === "query") {
      await client.query("BEGIN TRANSACTION READ ONLY");
      const result = await client.query(args.sql);
      await client.query("ROLLBACK");
      return {
        content: [{ type: "text", text: JSON.stringify(result.rows, null, 2) }],
      };
    }

    if (name === "execute") {
      const result = await client.query(args.sql);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ rowCount: result.rowCount, command: result.command }),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } finally {
    await client.end();
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
