import type { IFileRepository } from "@/domain/model/shared/IFileRepository";
import { TFile } from "obsidian";

export class MockFileRepository implements IFileRepository {
	find(_path: string) {
		const file = new TFile();
		return file;
	}

	async updateFrontmatter(
		_file: TFile,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		_frontmatter: Record<string, any>,
	) {
		// nothing
	}
}