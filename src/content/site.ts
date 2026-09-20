import type { SiteMetadata } from "../types/site";

export const site: SiteMetadata = {
  name: "Pathwisse",
  company: "Shaquantum Labs Private Limited",
  defaultTitle: "Pathwisse",
  defaultDescription:
    "Pathwisse explores a more connected journey from learning and applied work to placement preparation.",
  // Approved production origin. Single source of truth: astro.config.mjs,
  // canonical URLs, sitemap, and robots.txt all read this value.
  siteUrl: "https://pathwisse.com",
  // Approved public contact and demo-request destination.
  contactEmail: "pathwisse@gmail.com",
};

// Approved product destinations. Do not change without explicit approval.
export const productLinks = {
  getStarted: "https://app.pathwisse.com/signup",
  signIn: "https://app.pathwisse.com/login",
} as const;
