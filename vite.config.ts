import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "DartNet_data-collection-ui",
  base: "",
  server: {
    watch: {
      usePolling: true // windows wsl2 limitation https://github.com/vitejs/vite/issues/5878
    }
  }
});
