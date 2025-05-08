import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/voucher-display.js",
      name: "VoucherDisplay",
      fileName: (format) => `voucher-display.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
