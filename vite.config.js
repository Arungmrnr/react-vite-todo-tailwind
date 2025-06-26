import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
  },
  server: {
    open: true,
    port: 5173
  }
});