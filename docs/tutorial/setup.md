---
id: setup
title: Dev Environment Setup
sidebar_position: 2
---

# Dev Environment Setup

The exact setup I use across all my projects. Reproducible, fast, low-maintenance.

## What you'll get

- Node version manager (no more `nvm use` pain)
- `pnpm` for fast installs
- VS Code extensions that actually help
- Git hooks that catch bugs before CI does

## Node with `fnm`

I switched from `nvm` to [`fnm`](https://github.com/Schniz/fnm) — same idea, 40× faster.

```bash
# macOS
brew install fnm

# Linux / WSL
curl -fsSL https://fnm.vercel.app/install | bash
```

Add to your shell (`~/.zshrc` or `~/.bashrc`):

```bash
eval "$(fnm env --use-on-cd)"
```

Now create a `.node-version` file in each project:

```
20.11.0
```

`fnm` will switch versions automatically when you `cd` in.

## pnpm

```bash
npm install -g pnpm
```

The only `package.json` change needed:

```json
{
  "packageManager": "pnpm@8.15.0"
}
```

## Project scaffold

Every new project starts from the same `justfile`:

```makefile
# justfile

default:
  just --list

dev:
  pnpm dev

db-push:
  pnpm prisma db push

db-studio:
  pnpm prisma studio

lint:
  pnpm eslint . && pnpm tsc --noEmit

deploy:
  git push dokku main
```

Install `just`: `brew install just`

## Git hooks with `lefthook`

```bash
pnpm add -D lefthook
```

`lefthook.yml`:

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: "*.{ts,tsx}"
      run: pnpm eslint {staged_files}
    types:
      run: pnpm tsc --noEmit

pre-push:
  commands:
    tests:
      run: pnpm test --passWithNoTests
```

```bash
pnpm lefthook install
```

Done — commits won't go through if lint or types fail.

## VS Code settings

`.vscode/settings.json` (commit this):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

Recommended extensions (`.vscode/extensions.json`):

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss"
  ]
}
```
