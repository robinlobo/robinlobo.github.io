---
slug: postmarked-postmortem
title: Postmarked Postmortem — What I Learned Killing My First Product
authors:
  name: Robin Lobo
  title: Developer
  url: https://robinlobo.com
tags: [development, postmortem, lessons]
date: 2024-07-22
---

Postmarked was a pay-as-you-go transactional email API. I shut it down after fourteen months. Here's the honest version of why.

<!-- truncate -->

## What it was

The idea was simple: send transactional email without a monthly subscription. Most email APIs (Mailgun, Postmark, SendGrid) charge $20–35/month even if you're sending 500 emails. For an personal project just starting out, that's a meaningful fixed cost.

Postmarked charged $0.001 per email. Nothing until you used it.

## What happened

I launched, got 200 signups in the first week from a Hacker News post, and thought I was onto something. By month three I had 40 active customers. By month twelve, still 40 active customers.

The problem: my best customers — the ones who actually sent enough email to generate real revenue — outgrew me. When a startup scaled from 1,000 emails/month to 500,000, they switched to a larger provider. Not because Postmarked was worse, but because the larger providers had deliverability features, dedicated IPs, and compliance tooling that justified the monthly fee.

I had built a product for a stage of growth, not a business.

## The numbers

- Total revenue: $3,200 across 14 months
- Highest MRR: $320 (month 9)
- Average customer lifetime: 4.1 months
- Churn reason most cited: "scaling up / moving to [Postmark/Mailgun]"

$320 MRR at peak. That's €300/month, not a business.

## What I actually got wrong

**I solved a price problem, not a pain problem.** Founders with 40 active users don't lie awake worrying about their $20 Mailgun bill. I thought I was removing friction. I was solving a problem that didn't actually hurt.

**Pay-as-you-go pricing is terrible for a bootstrapped SaaS.** Revenue was unpredictable. A customer who sent no emails one month paid me nothing even if they were actively using the product. I couldn't forecast, couldn't plan, couldn't grow.

**I was competing on price in a market where price wasn't the decision factor.** Email deliverability is a trust product. Startups don't switch email providers to save $20/month — they switch when something breaks. I had no reputation yet, which meant I was asking people to trust an unknown provider to handle their most important communications.

## What Postmarked gave me

Fourteen months of running a real product. I learned how to handle webhooks at scale, how to think about deliverability, how to do customer support for a developer tool, and how to shut something down gracefully without burning bridges.

Two of the customers I made in Postmarked became Patchwork customers. One of them is still paying me today.

The product failed. The time wasn't wasted.

## If you're thinking about building something similar

The market is real — developers do want simpler email infrastructure. But the winning product in this space needs a different angle: either go upmarket (compliance, enterprise deliverability) or go horizontal (email + SMS + push in one API). Pure transactional email at developer pricing is a crowded, low-margin problem that doesn't get easier as you grow.

I'm glad I built it. I'm glad I stopped.
