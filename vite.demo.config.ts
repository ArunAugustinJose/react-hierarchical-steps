import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist-demo"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
