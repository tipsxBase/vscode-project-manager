import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: resolve(process.cwd(), "../../ui"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "tag.html"),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared/src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
