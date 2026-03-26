# postgres-rw MCP Server

**EN** | [RU](#ru)

A Model Context Protocol (MCP) server for PostgreSQL that supports both read and write operations. Unlike the official `@modelcontextprotocol/server-postgres`, this server allows executing INSERT, UPDATE, DELETE and other write statements.

## Tools

| Tool | Description |
|------|-------------|
| `query` | Run a read-only SQL query (SELECT) |
| `execute` | Execute a write SQL statement (INSERT, UPDATE, DELETE, DDL) |

## Installation

```bash
claude mcp add --transport stdio -- postgres npx -y mcp-postgres-rw postgresql://user:password@host:5432/dbname
```

Restart Claude Code — `query` and `execute` tools will be available.

---

## RU

MCP-сервер для PostgreSQL с поддержкой операций чтения и записи. В отличие от официального `@modelcontextprotocol/server-postgres`, этот сервер позволяет выполнять INSERT, UPDATE, DELETE и другие write-запросы.

## Инструменты

| Инструмент | Описание |
|------------|----------|
| `query` | Выполнить SQL-запрос на чтение (SELECT) |
| `execute` | Выполнить SQL-запрос на запись (INSERT, UPDATE, DELETE, DDL) |

## Установка

```bash
claude mcp add --transport stdio -- postgres npx -y mcp-postgres-rw postgresql://user:password@host:5432/dbname
```

Перезапустить Claude Code — будут доступны инструменты `query` и `execute`.

## Requirements

- Node.js 18+
- PostgreSQL
