import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./about.module.css";

const TIMELINE = [
  {
    period: "2023–Now",
    title: "Going developer",
    desc: "Quit my job to build products full-time. Three projects live, $3k MRR and growing. Writing about the honest parts every week.",
  },
  {
    period: "2020–2023",
    title: "Senior Engineer, Notion",
    desc: "Worked on editor infrastructure and real-time collaboration. Learned how to build for millions of users.",
  },
  {
    period: "2018–2020",
    title: "Full-stack Engineer, Loom",
    desc: "Early employee. Helped scale from 0 to 14M users. Shipped the browser extension and desktop app.",
  },
  {
    period: "2014–2018",
    title: "CS @ UC Berkeley",
    desc: "Focused on distributed systems. Built a key-value store for my thesis. Graduated with honors.",
  },
];

const STACK = {
  "I build with": [
    "Next.js",
    "React",
    "TypeScript",
    "Postgres",
    "Tailwind",
    "Prisma",
  ],
  "I deploy on": ["Vercel", "Railway", "Hetzner VPS", "Cloudflare"],
  "I reach customers via": [
    "Twitter",
    "Newsletter",
    "Developers",
    "Product Hunt",
  ],
};

export default function About(): JSX.Element {
  return (
    <Layout
      title="About Robin Lobo"
      description="Full-stack engineer going developer."
    >
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className="e-label">About</div>
            <h1 className={styles.name}>Robin Lobo</h1>
          </header>

          {/* Split bio */}
          <section className={styles.bio}>
            <div className={styles.bioText}>
              <p>
                I'm a full-stack engineer who left a comfortable job at a big
                tech company to build products people actually want. Based in
                Lisbon. Working on <Link to="/projects">three projects</Link> at
                once (not always wise, but here we are).
              </p>
              <p>
                I've been writing code professionally since 2018 — long enough
                to have strong opinions about architecture and short enough to
                still find new things interesting. I care most about shipping:
                getting something in front of users fast, learning from it, and
                iterating.
              </p>
              <p>
                I write a{" "}
                <Link to="https://robinlobo.substack.com">
                  weekly newsletter
                </Link>{" "}
                about the unglamorous parts of developer hacking — revenue
                numbers, what's working, what isn't. 1,200 readers so far.
              </p>
              <div className={styles.bioLinks}>
                <Link
                  to="https://github.com/robinlobo"
                  className={styles.bioLink}
                >
                  GitHub
                </Link>
                <Link to="mailto:" className={styles.bioLink}>
                  Email me
                </Link>
              </div>
            </div>
            <aside className={styles.bioAside}>
              <div className={styles.avatarBox}>JS</div>
              <div className={styles.nowCard}>
                <div className="e-label" style={{ marginBottom: 10 }}>
                  Now
                </div>
                <p className={styles.nowText}>
                  Shipping Patchwork v2 · Targeting $10k MRR · Writing every
                  Thursday
                </p>
              </div>
            </aside>
          </section>

          <hr className={styles.rule} />

          {/* Stack */}
          <section className={styles.section}>
            <div className="e-label">Toolkit</div>
            <h2 className={styles.sectionTitle}>How I work</h2>
            <div className={styles.stackGrid}>
              {Object.entries(STACK).map(([cat, items]) => (
                <div key={cat} className={styles.stackRow}>
                  <span className={styles.stackCat}>{cat}</span>
                  <div className={styles.stackTags}>
                    {items.map((s) => (
                      <span key={s} className="e-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.rule} />

          {/* Timeline */}
          <section className={styles.section}>
            <div className="e-label">History</div>
            <h2 className={styles.sectionTitle}>Where I've been</h2>
            <div className={styles.timeline}>
              {TIMELINE.map((t, i) => (
                <div key={i} className={styles.tlRow}>
                  <div className={styles.tlPeriod}>{t.period}</div>
                  <div className={styles.tlContent}>
                    <div className={styles.tlTitle}>{t.title}</div>
                    <p className={styles.tlDesc}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className={styles.rule} />

          {/* Contact */}
          <section className={`${styles.section} ${styles.contact}`}>
            <div className="e-label">Say hello</div>
            <h2 className={styles.sectionTitle}>Let's talk</h2>
            <p className={styles.contactText}>
              I'm always happy to chat about building products, the developer
              hacking journey, or full-stack architecture. Email is the best way
              to reach me.
            </p>
            <Link to="mailto:" className={styles.contactBtn}>
              x@.com →
            </Link>
          </section>
        </div>
      </main>
    </Layout>
  );
}
