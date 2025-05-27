// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": process.env.VITE_API_URL ? process.env.VITE_API_URL : "http://localhost:3001",
        "/uploads": {
          target: process.env.VITE_API_URL ? process.env.VITE_API_URL : "http://localhost:3001",
          changeOrigin: true,
        },
      },
    },
  });
};
