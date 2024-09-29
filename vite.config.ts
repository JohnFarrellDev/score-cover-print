import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Add this import
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      exclude: [
        "postcss.config.js",
        "tailwind.config.js",
        "vite.config.ts",
        "eslint.config.js",
        "src/vite-env.d.ts",
      ],
    },
  },
});
