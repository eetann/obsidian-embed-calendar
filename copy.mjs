import { copyFile } from "node:fs/promises";

const filesToCopy = ["main.js", "styles.css", "manifest.json", ".hotreload"];
const pluginPath = process.env.PLUGIN_PATH;

async function copyFiles() {
	if (!pluginPath) {
		console.error("The PLUGIN_PATH environment variable is required");
		return;
	}
	try {
		for (const file of filesToCopy) {
			const sourcePath = `./${file}`;
			const destPath = `${pluginPath}/${file}`;
			await copyFile(sourcePath, destPath);
			console.log(`Copied ${file} to ${destPath}`);
		}
	} catch (err) {
		console.error("Error copying files:", err);
	}
}

copyFiles();
