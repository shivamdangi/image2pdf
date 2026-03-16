import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://image2pdf-xi.vercel.app/",
      routes: [
        "/",
        "/image-to-pdf",
        "/jpg-to-pdf",
        "/png-to-pdf",
        "/webp-to-pdf",
        "/merge-images-to-pdf"
      ]
    })
  ]
});