# mcp-postgres-rw

**EN** | [RU](#ru)

[![npm version](https://img.shields.io/npm/v/mcp-postgres-rw)](https://www.npmjs.com/package/mcp-postgres-rw)
[![npm downloads](https://img.shields.io/npm/dm/mcp-postgres-rw)](https://www.npmjs.com/package/mcp-postgres-rw)
[![license](https://img.shields.io/npm/l/mcp-postgres-rw)](LICENSE)
[![node](https://img.shields.io/node/v/mcp-postgres-rw)](package.json)

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server for PostgreSQL with **full read and write support**.

> **Why this package?** The official `@modelcontextprotocol/server-postgres` only allows SELECT queries. `mcp-postgres-rw` adds an `execute` tool so your AI assistant can also run INSERT, UPDATE, DELETE, and DDL statements.

## Tools

| Tool | Description |
|------|-------------|
| `query` | Run a read-only SQL query (SELECT) — wrapped in a read-only transaction |
| `execute` | Execute a write SQL statement (INSERT, UPDATE, DELETE, CREATE, DROP, …) |

## Installation

### Claude Code (CLI)

```bash
claude mcp add --transport stdio -- postgres npx -y mcp-postgres-rw postgresql://user:password@host:5432/dbname
```

Restart Claude Code — `query` and `execute` tools will be available.

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "mcp-postgres-rw", "postgresql://user:password@host:5432/dbname"]
    }
  }
}
```

### Cursor / Windsurf / other MCP clients

Add to your MCP config file:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "mcp-postgres-rw", "postgresql://user:password@host:5432/dbname"]
    }
  }
}
```

## Usage example

Once connected, you can ask your AI assistant things like:

- *"Show me all users registered in the last 7 days"* → uses `query`
- *"Insert a new product with name 'Widget' and price 9.99"* → uses `execute`
- *"Delete orders older than 2023"* → uses `execute`

## Security note

The `execute` tool runs statements directly against your database with the permissions of the provided connection string. Use a dedicated database user with only the privileges your workflow requires.

## Requirements

- Node.js 18+
- PostgreSQL

---

## RU

[![npm version](https://img.shields.io/npm/v/mcp-postgres-rw)](https://www.npmjs.com/package/mcp-postgres-rw)
[![npm downloads](https://img.shields.io/npm/dm/mcp-postgres-rw)](https://www.npmjs.com/package/mcp-postgres-rw)
[![license](https://img.shields.io/npm/l/mcp-postgres-rw)](LICENSE)

MCP-сервер для PostgreSQL с поддержкой **чтения и записи**.

> **Зачем этот пакет?** Официальный `@modelcontextprotocol/server-postgres` разрешает только SELECT-запросы. `mcp-postgres-rw` добавляет инструмент `execute`, чтобы ИИ-ассистент мог также выполнять INSERT, UPDATE, DELETE и DDL-команды.

## Инструменты

| Инструмент | Описание |
|------------|----------|
| `query` | Выполнить SQL-запрос на чтение (SELECT) — в read-only транзакции |
| `execute` | Выполнить SQL-запрос на запись (INSERT, UPDATE, DELETE, CREATE, DROP, …) |

## Установка

### Claude Code (CLI)

```bash
claude mcp add --transport stdio -- postgres npx -y mcp-postgres-rw postgresql://user:password@host:5432/dbname
```

Перезапустить Claude Code — будут доступны инструменты `query` и `execute`.

### Claude Desktop

Добавить в `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) или `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "mcp-postgres-rw", "postgresql://user:password@host:5432/dbname"]
    }
  }
}
```

### Cursor / Windsurf / другие MCP-клиенты

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "mcp-postgres-rw", "postgresql://user:password@host:5432/dbname"]
    }
  }
}
```

## Пример использования

После подключения можно попросить ИИ-ассистента:

- *«Покажи всех пользователей, зарегистрированных за последние 7 дней»* → использует `query`
- *«Добавь новый товар с названием Widget и ценой 9.99»* → использует `execute`
- *«Удали заказы старше 2023 года»* → использует `execute`

## Безопасность

Инструмент `execute` выполняет запросы напрямую с правами переданной строки подключения. Используйте отдельного пользователя БД с минимально необходимыми привилегиями.

## Требования

- Node.js 18+
- PostgreSQL
