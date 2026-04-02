import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function NotFound(): JSX.Element {
  return (
    <Layout title="404 — Page not found">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--e-muted)",
            marginBottom: "16px",
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            color: "var(--e-ink)",
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--e-muted)",
            maxWidth: "380px",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          Whatever you were looking for isn't here. Maybe it moved, maybe it
          never existed.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--e-accent)",
            color: "#fff",
            fontWeight: 500,
            fontSize: "0.875rem",
            padding: "10px 22px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          Back home →
        </Link>
      </main>
    </Layout>
  );
}
