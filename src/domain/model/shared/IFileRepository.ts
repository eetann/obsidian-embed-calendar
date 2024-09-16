import type { TFile } from "obsidian";
import type { Event } from "../event/event";

export interface IFileRepository {
	create(event: Event): Promise<void>;
	find(path: string): TFile | undefined;
	updateFrontmatter(
		file: TFile,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		frontmatter: Record<string, any>,
	): Promise<void>;
}
