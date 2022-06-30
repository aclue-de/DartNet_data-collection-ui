import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mix from 'vite-plugin-mix';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mix({
      handler: './server/handler.ts',
    }),
  ],
  //base: "DartNet_data-collection-ui",
  base: "",
  server: {
    watch: {
      usePolling: true // windows wsl2 limitation https://github.com/vitejs/vite/issues/5878
    }
  }
});
