import path from "node:path";
import fsExtra from "fs-extra";

const VAULT_PATH = process.env.VAULT_PATH;
const PLUGIN_PATH = `${VAULT_PATH}/.obsidian/plugins/obsidian-embed-calendar`;

if (!VAULT_PATH) {
	console.error("VAULT_PATH environment variable is not set.");
	process.exit(1);
}

const sourceDir = path.resolve("./test-vault");
const destinationDir = path.resolve(VAULT_PATH);

async function copyFiles() {
	try {
		fsExtra.mkdirpSync(PLUGIN_PATH);

		await fsExtra.emptyDir(destinationDir);
		console.log(`Emptied directory: ${destinationDir}`);

		await fsExtra.copy(sourceDir, destinationDir);
		console.log(`Copied files from ${sourceDir} to ${destinationDir}`);
	} catch (err) {
		console.error("Error occurred:", err);
		process.exit(1);
	}
}

copyFiles();
