import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", ".astro/", "ECC/"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Canvas motion-graphic sources: classic browser scripts sharing globals.
    files: ["motion/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        requestAnimationFrame: "readonly",
      },
    },
  },
  {
    // Offline exporter (Node, plus browser globals inside page.evaluate).
    files: ["motion/export.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
  },
);
