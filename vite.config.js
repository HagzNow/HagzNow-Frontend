import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite"; // ← ضيف السطر ده

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← وضيف Tailwind هنا كبلجن
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
