import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  server: {
    host: "0.0.0.0",
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      input: './index.html'
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});