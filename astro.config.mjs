import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { site } from "./src/content/site.ts";

// Fully static site. No adapter is needed: Vercel builds and serves static
// Astro output directly. Add an adapter only if a real on-demand route is
// approved (see docs/architecture/WEBSITE_ARCHITECTURE.md).
export default defineConfig({
  site: site.siteUrl,
  output: "static",
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/style-guide") && !page.includes("/404"),
    }),
  ],
});
