import type { DataArray, Literal } from "obsidian-dataview";
export class MockDataviewApi {
	pages(_query: string): DataArray<Record<string, Literal>> {
		const result = [];
		for (let i = 0; i < 9; i++) {
			result.push({
				file: {
					path: `inbox/note_${i}`,
					frontmatter: {
						start: `2024-09-0${i}`,
						end: `2024-09-0${i + 1}`,
					},
				},
			});
		}
		return result;
	}
}
