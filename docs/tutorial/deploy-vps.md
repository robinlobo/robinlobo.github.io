---
id: deploy-vps
title: Deploy on a VPS
sidebar_position: 5
---

# Deploy on a VPS (and stop paying Heroku prices)

A €4/month Hetzner server running Dokku will handle your first $10k MRR with room to spare.

## Why a VPS

Vercel and Railway are great but they get expensive fast. A Hetzner CX22 (2 vCPU, 4GB RAM) 
costs €4/month and handles multiple apps with Postgres, Redis, and SSL — all included.

## Set up Hetzner

1. Create an account at [hetzner.com](https://hetzner.com)
2. New server → CX22 → Ubuntu 22.04 → Add your SSH key
3. Note the IP address

## Install Dokku

```bash
# SSH into your server
ssh root@YOUR_IP

# Install Dokku
wget -NP . https://dokku.com/bootstrap.sh
sudo DOKKU_TAG=v0.34.4 bash bootstrap.sh

# Set your domain
dokku domains:set-global yourdomain.com
```

## Create an app

```bash
# On the server
dokku apps:create myapp
dokku postgres:create myapp-db
dokku postgres:link myapp-db myapp

# Set env vars
dokku config:set myapp \
  NEXTAUTH_SECRET=$(openssl rand -base64 32) \
  NEXTAUTH_URL=https://myapp.yourdomain.com \
  NODE_ENV=production
```

## Deploy from your machine

```bash
# One-time setup (on your machine)
git remote add dokku dokku@YOUR_IP:myapp

# Deploy
git push dokku main
```

Dokku detects Next.js, builds it, zero-downtime swaps the container. That's it.

## SSL (free, automatic)

```bash
dokku letsencrypt:enable myapp
dokku letsencrypt:cron-job --add  # auto-renew
```

## Postgres backups

```bash
# On the server, add to crontab
0 2 * * * dokku postgres:export myapp-db > /backups/myapp-$(date +%Y%m%d).dump
```

Or use [Hetzner Snapshots](https://docs.hetzner.com/cloud/servers/backups-snapshots/overview/) 
for full server backups — €0.01/GB/month.

## Scale when you need to

When traffic grows, upgrade the server size in the Hetzner dashboard (takes ~30 seconds). 
You don't need Kubernetes until you're well past $50k MRR.

## What I'd do differently

- Set up backups before you have users, not after.
- Use `dokku ps:scale myapp web=2` to run two web processes — free horizontal scaling on the same server.
- Add Caddy as a reverse proxy if you need more control than Nginx gives you.
