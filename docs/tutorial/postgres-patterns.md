---
id: postgres-patterns
title: Postgres Patterns for Developers
sidebar_position: 4
---

# Postgres Patterns for Developers

Schema decisions that let a single developer move fast without painting themselves into corners.

## The baseline schema

Every SaaS table gets these columns:

```sql
CREATE TABLE users (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  plan        TEXT NOT NULL DEFAULT 'free',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

## Soft deletes

Don't delete rows — mark them deleted and filter in queries.

```sql
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMPTZ;

-- "Active" posts
SELECT * FROM posts WHERE deleted_at IS NULL;

-- Partial index for performance
CREATE INDEX idx_posts_active ON posts (user_id) WHERE deleted_at IS NULL;
```

In Prisma:

```ts
// Always filter soft-deleted rows
const posts = await db.post.findMany({
  where: { userId, deletedAt: null },
});
```

## Multi-tenancy with RLS

Row-Level Security lets Postgres enforce tenant isolation at the database level.

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON posts
  USING (user_id = current_setting('app.user_id')::TEXT);
```

Set the user context per-request:

```ts
await db.$executeRaw`SET LOCAL app.user_id = ${userId}`;
```

## Useful indexes

```sql
-- Full-text search (no need for Elasticsearch at developer scale)
ALTER TABLE posts ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body,''))
  ) STORED;

CREATE INDEX idx_posts_search ON posts USING GIN (search_vector);

-- Query
SELECT * FROM posts WHERE search_vector @@ plainto_tsquery('english', 'your query');
```

## Connection pooling

Use [PgBouncer](https://www.pgbouncer.org/) or [Supabase](https://supabase.com)'s built-in pooler.
Serverless environments open a new connection per request — without pooling you'll hit Postgres
limits fast.

```
DATABASE_URL="postgres://...?pgbouncer=true&connection_limit=1"
```

## What I've learned

- Use `TEXT` over `VARCHAR(n)` — Postgres stores them the same way, `TEXT` is less footgun.
- Always store timestamps in UTC (`TIMESTAMPTZ`).
- Add `created_at` / `updated_at` to every table from day one. You'll regret not having them.
- Avoid EAV patterns (key-value tables). Use JSONB for truly dynamic attributes instead.
