import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  basePath: "/hotel-booking-docs",

  redirects: [
    {
      from: "/",
      to: "/installation",
    },
    {
      from: "/undefined",
      to: "/installation",
    },
  ],

  metadata: {
    title: "Hotel Booking API Docs",
    description: "Interactive API documentation for the Hotel Booking System",
    favicon: "/favicon.ico",
  },

  // ── Top navigation ──────────────────────────────────────────────────────────
  navigation: [
    {
      type: "doc",
      file: "index",
      label: "Home",
    },
    {
      type: "category",
      label: "Documentation",
      items: [
        {
          type: "category",
          label: "Getting Started",
          items: [
            {
              type: "doc",
              file: "installation",
              label: "Installation",
            },
            {
              type: "doc",
              file: "authorization",
              label: "Authorization",
            },
            { type: "doc", file: "about", label: "About" },
          ],
        },
      ],
    },
    {
      type: "link",
      label: "API Reference",
      to: "/api",
    },
  ],

  // ── OpenAPI source ──────────────────────────────────────────────────────────
  apis: [
    {
      type: "file",
      input: "./openapi.yaml",
      path: "api",
    },
  ],

  // ── MDX pages ────────────────────────────────────────────────────────────
  docs: {
    files: "/docs/pages/**/*.{md,mdx}",
  },

  // ── Theme ────────────────────────────────────────────────────────────────
  theme: {
    light: {
      primary: "#1a56db",
      primaryForeground: "#ffffff",
    },
    dark: {
      primary: "#4f8ef7",
      primaryForeground: "#0f172a",
    },
  },
};

export default config;
