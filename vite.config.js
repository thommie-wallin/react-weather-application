import { defineConfig } from "vite";
import browserslistToEsbuild from "browserslist-to-esbuild";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "build",
    target: browserslistToEsbuild([">0.2%", "not dead", "not op_mini all"]),
  },
  plugins: [react()],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
});
