import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

/* ── Data ────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name: "Patchwork",
    desc: "Visual CMS for developers. Drag-and-drop content editor with Markdown, rich embeds, and one-click Vercel deploy.",
    tags: ["Next.js", "tRPC", "Postgres"],
    status: "Live",
    mrr: "$2.4k MRR",
    href: "/projects",
  },
  {
    name: "Sift",
    desc: "Personal finance tracker that actually respects your privacy. Local-first, no accounts, CSV import.",
    tags: ["SvelteKit", "SQLite", "Tauri"],
    status: "Beta",
    mrr: "Open source",
    href: "/projects",
  },
  {
    name: "Vessel",
    desc: "Ship faster with a production-ready SaaS starter kit: auth, billing, teams, emails — all wired up.",
    tags: ["Next.js", "Stripe", "Resend"],
    status: "Live",
    mrr: "$640 MRR",
    href: "/projects",
  },
];

const POSTS = [
  {
    title: "The Surprisingly Small Postgres Schema Behind Patchwork",
    date: "Jan 2025",
    slug: "/blog/patchwork-schema",
  },
  { title: "On Saying No to Features", date: "Nov 2024", slug: "/blog/say-no" },
  {
    title: "Why I Build in Public",
    date: "Sep 2024",
    slug: "/blog/build-in-public",
  },
];

/* ── Sub-components ──────────────────────────────────────── */
function ProjectCard({
  name,
  desc,
  tags,
  status,
  mrr,
  href,
}: (typeof PROJECTS)[0]) {
  return (
    <Link to={href} className={styles.projectCard}>
      <div className={styles.pcTop}>
        <span className={styles.pcName}>{name}</span>
        <div className={styles.pcMeta}>
          <span
            className={`${styles.pcStatus} ${
              status === "Live" ? styles.live : styles.beta
            }`}
          >
            {status}
          </span>
          <span className={styles.pcMrr}>{mrr}</span>
        </div>
      </div>
      <p className={styles.pcDesc}>{desc}</p>
      <div className={styles.pcTags}>
        {tags.map((t) => (
          <span key={t} className="e-tag">
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}

function PostRow({ title, date, slug }: (typeof POSTS)[0]) {
  return (
    <Link to={slug} className={styles.postRow}>
      <span className={styles.postTitle}>{title}</span>
      <span className={styles.postDate}>{date}</span>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Home(): JSX.Element {
  return (
    <Layout
      title="Robin Lobo — Builder"
      description="Full-stack engineer building and shipping products."
    >
      <main className={styles.main}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroProse}>
            <p className={styles.heroEyebrow}>Full-stack engineer</p>
            <h1 className={styles.heroName}>
              I build products,
              <br />
              <em>ship them,</em>
              <br />
              and write about it.
            </h1>
            <p className={styles.heroBio}>
              Hey, I'm Rob — a developer who makes software for people.
              Currently working on{" "}
              <Link to="/projects">three side projects</Link> and writing about
              the honest parts of work.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/projects" className={styles.btnPrimary}>
                See my work
              </Link>
              <Link to="/blog" className={styles.btnGhost}>
                Read the blog
              </Link>
            </div>
          </div>
          <aside className={styles.heroSidebar}>
            <div className={styles.statusCard}>
              <div className="e-label" style={{ marginBottom: 14 }}>
                Currently
              </div>
              <ul className={styles.statusList}>
                <li>🛠 Building Patchwork v2</li>
                <li>✍️ Writing weekly on growth + dev</li>
                <li>🎯 Target: $10k MRR by Dec</li>
                <li>📍 Based in Spain</li>
              </ul>
            </div>
            <div className={styles.metricsRow}>
              <div className={styles.metric}>
                <span className={styles.metricVal}>$3k+</span>
                <span className={styles.metricLabel}>monthly revenue</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricVal}>6</span>
                <span className={styles.metricLabel}>products shipped</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricVal}>1.2k</span>
                <span className={styles.metricLabel}>newsletter subs</span>
              </div>
            </div>
          </aside>
        </section>

        <div className={styles.sectionRule} />

        {/* ── Projects ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className="e-label">Work</div>
              <h2 className={styles.sectionTitle}>Active Projects</h2>
            </div>
            <Link to="/projects" className={styles.seeAll}>
              All projects →
            </Link>
          </div>
          <div className={styles.projectGrid}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        <div className={styles.sectionRule} />

        {/* ── Tutorial callout ── */}
        <section className={styles.tutorialCta}>
          <div className={styles.tutorialCtaInner}>
            <div>
              <div className="e-label" style={{ marginBottom: 8 }}>
                Learn
              </div>
              <h2 className={styles.tutorialTitle}>
                Full-stack guides for developers
              </h2>
              <p className={styles.tutorialDesc}>
                Practical tutorials on Next.js, Postgres patterns, deploying on
                a VPS, and everything else I've had to figure out the hard way.
              </p>
            </div>
            <Link to="/tutorials/intro" className={styles.btnPrimary}>
              Browse tutorials →
            </Link>
          </div>
        </section>

        <div className={styles.sectionRule} />

        {/* ── Writing ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <div className="e-label">Writing</div>
              <h2 className={styles.sectionTitle}>Latest Essays</h2>
            </div>
            <Link to="/blog" className={styles.seeAll}>
              All posts →
            </Link>
          </div>
          <div className={styles.postList}>
            {POSTS.map((p) => (
              <PostRow key={p.slug} {...p} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
