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
			// Make sure to externalize lit if you want to bundle it separately,
			// or remove 'external' to bundle everything together.
			// external: ['lit'],
			output: {
				globals: {
					// lit: 'lit'
				},
			},
		},
	},
});
