---
slug: patchwork-schema
title: The Surprisingly Small Postgres Schema Behind Patchwork
authors:
  name: Robin Lobo
  title: Developer
  url: https://robinlobo.com
tags: [postgres, engineering, saas]
date: 2025-01-14
---

Patchwork has 340 paying customers and handles thousands of content updates per day. The core schema is six tables. Here's what I got right and what I'd change.

<!-- truncate -->

## The schema

```sql
users           -- accounts
workspaces      -- multi-tenancy unit
memberships     -- users ↔ workspaces (with role)
collections     -- like a database in Notion
entries         -- like a row; has a JSONB `fields` column
media           -- uploaded files, linked to entries
```

That's it. Everything else is derived or lives in JSONB.

## The `fields` column

The core of Patchwork is that each collection can have custom fields — a blog might have `title`, `body`, `slug`, `published_at`. A product catalog has `name`, `price`, `sku`.

Rather than creating a table per collection (the Rails scaffold temptation), I went with JSONB:

```sql
CREATE TABLE entries (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id TEXT NOT NULL REFERENCES collections(id),
  workspace_id  TEXT NOT NULL REFERENCES workspaces(id),
  fields        JSONB NOT NULL DEFAULT '{}',
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_entries_fields ON entries USING GIN (fields);
```

This means I can query inside `fields`:

```sql
SELECT * FROM entries
WHERE collection_id = $1
  AND fields->>'status' = 'published'
  AND (fields->>'price')::numeric > 100;
```

## What I got right

**JSONB for schema-per-customer data.** I was scared of this at first — it felt like "giving up" on a real schema. In practice it's been solid. Postgres's GIN index handles queries well at Patchwork's scale, and I can add new field types without migrations.

**Workspace-level isolation.** Every query filters by `workspace_id`. Combined with Row-Level Security, there's no chance of data leaking between customers.

**Soft deletes everywhere.** `deleted_at TIMESTAMPTZ` on entries, collections, workspaces. Customers have accidentally deleted things twice. I restored them in under a minute both times.

## What I'd change

**The `media` table is coupled too tightly to entries.** I made media items always belong to an entry, but customers want to reuse images across entries. I'd make media workspace-level and add a join table.

**No audit log.** I have `updated_at` but not a history of changes. Customers have asked for "who changed this and when." It's a bigger schema change to add now than it would have been from the start.

## The boring lesson

The most useful schema decisions were the boring ones: consistent primary key format, `created_at`/`updated_at` on every table, soft deletes, workspace isolation. I over-indexed on the interesting architectural question (JSONB vs per-collection tables) when the fundamentals mattered more.
