// Deployed to GitHub Pages
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/harshify/",
  server: {
    port: 4500,
    host: "0.0.0.0",
    allowedHosts: ["localhost", "127.0.0.1"]
  }
});
