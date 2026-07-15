// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://vnsnippets.github.io",
  vite: { plugins: [tailwindcss()] },
  integrations: [
    expressiveCode({
      // Highly customizable: e.g., dual light/dark themes
      themes: [ "catppuccin-macchiato", "catppuccin-latte" ], 
    }),
    mdx()
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: "catppuccin-macchiato" }
  },
  image: {
    domains: ["github.com", "raw.githubusercontent.com"]
  }
});