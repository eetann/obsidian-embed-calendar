import { readFile } from "node:fs/promises";
import postcss from "postcss";
import postcssConfig from "./postcss.config.mjs";

// https://github.com/postcss/postcss?tab=readme-ov-file#js-api
//https://github.com/PKM-er/obsidian-zotlit/blob/5704873bd37f7a4695164dd84eab0e16a9aaf056/app/obsidian/esbuild-postcss.mjs
/**
 * @returns {import("esbuild").Plugin}
 */
export default function PostcssPlugin() {
	return {
		name: "postcss",
		setup: async (build) => {
			build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
				const processor = postcss(postcssConfig.plugins);
				const content = await readFile(path);
				const result = await processor.process(content, { from: path });
				return {
					contents: result.toString(),
					loader: "css",
				};
			});
		},
	};
}
