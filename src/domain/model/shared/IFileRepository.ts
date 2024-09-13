import type { TFile } from "obsidian";

export interface IFileRepository {
	find(path: string): TFile | undefined;
	updateFrontmatter(
		file: TFile,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		frontmatter: Record<string, any>,
	): Promise<void>;
}
