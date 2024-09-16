import type { Event } from "@/domain/model/event/event";
import type { IFileRepository } from "@/domain/model/shared/IFileRepository";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { type Plugin, TFile, stringifyYaml } from "obsidian";

export class FileRepository implements IFileRepository {
	constructor(
		private plugin: Plugin,
		private options: OptionsType,
	) {}

	async create(event: Event) {
		// TODO: テンプレートファイルの取得をやりたい
		const frontmatter = {
			// title:
			[this.options.startKey]: event.dateTime.startString,
		};
		if (this.options.endKey) {
			frontmatter[this.options.endKey] = event.dateTime.endString;
		}
		const content = `---\n${stringifyYaml(frontmatter)}\n---`;
		await this.plugin.app.vault.create(event.path.value, content);
	}

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
