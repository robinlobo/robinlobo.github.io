import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "robinlobo",
  tagline: "Estar.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://robinlobo.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "robinlobo", // Usually your GitHub org/user name.
  projectName: "robinlobo.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "tutorials",
          path: "docs",
          editUrl:
            "https://github.com/robinlobo/robinlobo.github.io/tree/main/",
        },
        blog: {
          showReadingTime: true,
          blogTitle: "Writing",
          blogDescription:
            "Essays on building products, growing as an engineer, and life.",
          postsPerPage: 8,
          blogSidebarTitle: "Recent posts",
          blogSidebarCount: 10,
          feedOptions: { type: ["rss", "atom"], xslt: true },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: ["@docusaurus/theme-mermaid"],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    image: "img/social-card.png",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "robinlobo",
      logo: { alt: "JS", src: "img/logo.svg" },
      items: [
        { to: "/projects", label: "Projects", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorials",
        },
        { to: "/blog", label: "Writing", position: "left" },
        { to: "/about", label: "About", position: "left" },
        {
          href: "https://github.com/robinlobo",
          label: "GitHub",
          position: "right",
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Work",
          items: [
            { label: "Projects", to: "/projects" },
            { label: "Tutorials", to: "/tutorials/intro" },
          ],
        },
        {
          title: "Words",
          items: [
            { label: "Writing", to: "/blog" },
            { label: "About", to: "/about" },
          ],
        },
        {
          title: "Elsewhere",
          items: [{ label: "GitHub", href: "https://github.com/robinlobo" }],
        },
      ],
      copyright: `© ${new Date().getFullYear()} robinlobo`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: [
        "bash",
        "rust",
        "go",
        "python",
        "yaml",
        "toml",
        "sql",
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
