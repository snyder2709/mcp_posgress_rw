# postgres-rw MCP Server

**EN** | [RU](#ru)

A Model Context Protocol (MCP) server for PostgreSQL that supports both read and write operations. Unlike the official `@modelcontextprotocol/server-postgres`, this server allows executing INSERT, UPDATE, DELETE and other write statements.

## Tools

| Tool | Description |
|------|-------------|
| `query` | Run a read-only SQL query (SELECT) |
| `execute` | Execute a write SQL statement (INSERT, UPDATE, DELETE, DDL) |

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/snyder2709/mcp_posgress_rw.git
cd mcp_posgress_rw
npm install
```

### 2. Add to Claude Code

```bash
claude mcp add --transport stdio -- postgres node /path/to/mcp_posgress_rw/index.js postgresql://user:password@host:5432/dbname
```

Replace `/path/to/mcp_posgress_rw` with the actual path and provide your PostgreSQL connection string.

### 3. Restart Claude Code

After restarting, the `query` and `execute` tools will be available.

---

## RU

MCP-сервер для PostgreSQL с поддержкой операций чтения и записи. В отличие от официального `@modelcontextprotocol/server-postgres`, этот сервер позволяет выполнять INSERT, UPDATE, DELETE и другие write-запросы.

## Инструменты

| Инструмент | Описание |
|------------|----------|
| `query` | Выполнить SQL-запрос на чтение (SELECT) |
| `execute` | Выполнить SQL-запрос на запись (INSERT, UPDATE, DELETE, DDL) |

## Установка

### 1. Клонировать репозиторий

```bash
git clone https://github.com/snyder2709/mcp_posgress_rw.git
cd mcp_posgress_rw
npm install
```

### 2. Добавить в Claude Code

```bash
claude mcp add --transport stdio -- postgres node /path/to/mcp_posgress_rw/index.js postgresql://user:password@host:5432/dbname
```

Замените `/path/to/mcp_posgress_rw` на реальный путь и укажите строку подключения к вашей БД.

### 3. Перезапустить Claude Code

После перезапуска будут доступны инструменты `query` и `execute`.

## Requirements

- Node.js 18+
- PostgreSQL
