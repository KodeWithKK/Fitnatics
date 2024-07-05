import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@api", replacement: "/src/api" },
      { find: "@components", replacement: "/src/components" },
      { find: "@config", replacement: "/src/config" },
      { find: "@context", replacement: "/src/context" },
      { find: "@data", replacement: "/src/data" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@icons", replacement: "/src/icons" },
      { find: "@images", replacement: "/src/images" },
      { find: "@layouts", replacement: "/src/layouts" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
