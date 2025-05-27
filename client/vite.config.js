// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:3001",
      "/uploads": {
        target: import.meta.env.VITE_API_URL
          ? import.meta.env.VITE_API_URL
          : "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
