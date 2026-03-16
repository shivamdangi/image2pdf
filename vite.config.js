import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), sitemapPlugin({
    hostname: "https://image2pdf-xi.vercel.app/"
  })],
});

