// Add polyfill for structuredClone for Node.js 16 compatibility
if (typeof structuredClone !== "function") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
