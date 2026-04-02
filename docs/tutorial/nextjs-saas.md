---
id: nextjs-saas
title: Building a SaaS with Next.js
sidebar_position: 3
---

# Building a SaaS with Next.js

The full-stack SaaS setup I use for every paid product. Auth, billing, team support, and 
transactional email — wired together and ready to ship.

## Stack

| Concern | Tool | Why |
|---------|------|-----|
| Framework | Next.js 14 (App Router) | Best DX, easy deploy |
| Auth | NextAuth v5 | Flexible, handles edge cases |
| Database | Postgres + Prisma | Reliable, great types |
| Billing | Stripe | Industry standard |
| Email | Resend + React Email | Modern, beautiful templates |
| Deploy | Vercel | Zero config for Next.js |

## Project structure

```
app/
  (auth)/         # Login, signup, reset
  (dashboard)/    # Protected routes
  api/
    auth/         # NextAuth handlers
    webhooks/     # Stripe webhooks
components/
  ui/             # Shadcn components
  dashboard/      # Feature components
lib/
  auth.ts         # NextAuth config
  db.ts           # Prisma client
  stripe.ts       # Stripe client
prisma/
  schema.prisma
```

## Auth setup

```ts
// lib/auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub],
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id },
    }),
  },
})
```

## Protecting routes

```ts
// middleware.ts
import { auth } from "@/lib/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}
```

## Stripe billing

```ts
// lib/stripe.ts
import Stripe from "stripe"
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Create checkout session
export async function createCheckoutSession(userId: string, priceId: string) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId },
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  })
}
```

## Webhook handler

```ts
// app/api/webhooks/stripe/route.ts
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    await db.user.update({
      where: { id: session.metadata!.userId },
      data: { plan: "pro" },
    })
  }

  return new Response(null, { status: 200 })
}
```

## What I'd do differently

- Start with a single pricing tier. Adding tiers later is easy; removing them is hard.
- Use Stripe's customer portal from day one — saves you from building a settings page.
- Set up webhook replay before you need it. Stripe's dashboard makes this easy but you have to think about idempotency.
