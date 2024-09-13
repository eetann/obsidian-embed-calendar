import type { IFileRepository } from "@/domain/model/shared/IFileRepository";
import { type Plugin, TFile } from "obsidian";

export class FileRepository implements IFileRepository {
	constructor(private plugin: Plugin) {}

	find(path: string) {
		const file = this.plugin.app.vault.getAbstractFileByPath(path);
		if (file instanceof TFile) {
			return file;
		}
		return undefined;
	}

	async updateFrontmatter(
		file: TFile,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		frontmatter: Record<string, any>,
	) {
		try {
			await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
				for (const [key, value] of Object.entries(frontmatter)) {
					fm[key] = value;
				}
			});
		} catch (e) {
			throw new Error(
				`Failed to update frontmatter\n  path:${file.path}\n  frontmatter:${frontmatter}`,
			);
		}
	}
}
