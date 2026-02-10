import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
    },
  },
});
