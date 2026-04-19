import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/axios-test/",
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toLocaleString()),
    __AXIOS_DOWNLOADS__: JSON.stringify(process.env.AXIOS_DOWNLOADS || "0"),
  },
});