import builtins from "builtin-modules";
import esbuild from "esbuild";
import process from "node:process";
import path from "node:path";
import fs from "node:fs";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = process.argv[2] === "production";
const pluginPath = process.env.PLUGIN_PATH;
console.log(pluginPath);

const copyFiles = [
	{ from: "dist/main.js", to: "main.js" },
	{ from: "dist/main.css", to: "styles.css" },
	{ from: "src/manifest.json", to: "manifest.json" },
];

const myCopy = {
	name: "my-copy",
	setup(build) {
		build.onEnd(async () => {
			for (const copyFile of copyFiles) {
				fs.copyFileSync(copyFile.from, path.join(pluginPath, copyFile.to));
			}
			if (!prod) {
				fs.writeFileSync(path.join(pluginPath, ".hotreload"), "");
			}
		});
	},
};

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ["src/main.tsx"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins,
	],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "dist/main.js",
	plugins: [myCopy],
});

if (prod) {
	await context.rebuild();
	process.exit(0);
} else {
	await context.watch();
}
