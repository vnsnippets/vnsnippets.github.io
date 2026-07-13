// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      // Choose any built-in theme (e.g., 'dracula', 'nord', 'css-variables')
      theme: 'catppuccin-macchiato', 
    },
  },
});