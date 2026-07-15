// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://vnsnippets.github.io",
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'prism',
    shikiConfig: { theme: "catppuccin-macchiato" }
  },
  image: {
    domains: ["github.com", "raw.githubusercontent.com"]
  }
});