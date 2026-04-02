import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./projects.module.css";

const PROJECTS = [
  {
    name: "Patchwork",
    tagline: "Visual CMS for developers",
    desc: "A drag-and-drop content editor with Markdown, rich embeds, image hosting, and one-click Vercel deploy. Built for devs who want a CMS they actually own.",
    tags: ["Next.js", "tRPC", "Postgres", "Vercel"],
    status: "Live",
    revenue: "$2.4k MRR",
    launched: "Mar 2024",
    users: "340 customers",
    category: "SaaS",
    link: "https://robinlobo.com",
  },
  {
    name: "Vessel",
    tagline: "SaaS starter kit",
    desc: "Production-ready Next.js boilerplate: auth (NextAuth), billing (Stripe), teams, transactional email (Resend), and a clean dashboard. Ship in hours, not weeks.",
    tags: ["Next.js", "Stripe", "Resend", "Tailwind"],
    status: "Live",
    revenue: "$640 MRR",
    launched: "Nov 2023",
    users: "120 licenses sold",
    category: "Templates",
    link: "https://github.com/robinlobo/vessel",
  },
  {
    name: "Sift",
    tagline: "Privacy-first finance tracker",
    desc: "Local-first personal finance app. No accounts, no cloud sync, no ads. CSV import from any bank. Your data stays on your machine.",
    tags: ["SvelteKit", "SQLite", "Tauri"],
    status: "Beta",
    revenue: "Open source",
    launched: "Jan 2025",
    users: "2.1k GitHub stars",
    category: "Open Source",
    link: "https://github.com/robinlobo/sift",
  },
  {
    name: "Postmarked",
    tagline: "One-off email sending API",
    desc: "Pay-as-you-go transactional email API. No monthly subscription, no minimum. $0.001 per email. Built for developer projects and prototypes.",
    tags: ["Go", "SES", "Stripe"],
    status: "Sunset",
    revenue: "Closed",
    launched: "Jun 2022",
    users: "Learnings blog post →",
    category: "SaaS",
    link: "/blog/postmarked-postmortem",
  },
];

const CATS = ["All", "SaaS", "Templates", "Open Source"] as const;

export default function Projects(): JSX.Element {
  const [cat, setCat] = useState<string>("All");
  const visible =
    cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <Layout title="Projects" description="Products I've built and shipped.">
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.container}>
            <div className="e-label">Work</div>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.subtitle}>
              Things I've built, shipped, and sometimes sunsetted. Revenue is
              public — I believe in building transparently.
            </p>
          </div>
        </header>

        <div className={styles.container}>
          {/* Filters */}
          <div className={styles.filters}>
            {CATS.map((c) => (
              <button
                key={c}
                className={`${styles.filter} ${
                  cat === c ? styles.filterOn : ""
                }`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className={styles.list}>
            {visible.map((p) => (
              <Link key={p.name} to={p.link} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.cardTopRow}>
                    <span className={styles.cardName}>{p.name}</span>
                    <span
                      className={`${styles.badge} ${
                        p.status === "Live"
                          ? styles.badgeLive
                          : p.status === "Beta"
                          ? styles.badgeBeta
                          : styles.badgeSunset
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className={styles.cardTagline}>{p.tagline}</div>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.tags}>
                    {p.tags.map((t) => (
                      <span key={t} className="e-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.cardStats}>
                  <Stat
                    label="Revenue"
                    value={p.revenue}
                    highlight={p.status === "Live"}
                  />
                  <Stat label="Launched" value={p.launched} />
                  <Stat label="Traction" value={p.users} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span
        className={`${styles.statVal} ${highlight ? styles.statHighlight : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
