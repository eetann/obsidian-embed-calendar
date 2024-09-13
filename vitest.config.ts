import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
			obsidian: path.resolve(__dirname, "__mocks__/obsidian.ts"),
		},
		environment: "jsdom",
	},
});
