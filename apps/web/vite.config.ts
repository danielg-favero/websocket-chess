import path from "path";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
  server: {
    allowedHosts: ["https://websocket-chess-dm3e.onrender.com"],
  },
});
