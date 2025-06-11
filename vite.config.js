import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/voucher-display.js",
			name: "VoucherDisplay",
			fileName: (format) => `voucher-display.${format}.js`,
			formats: ["umd"],
		},
		rollupOptions: {
			// DO NOT externalize 'lit'!
			// external: ['lit'],
			output: {
				globals: {
					// lit: 'lit'
				},
			},
		},
	},
});
