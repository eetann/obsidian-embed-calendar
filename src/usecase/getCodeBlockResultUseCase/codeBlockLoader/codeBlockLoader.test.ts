import { MockDataviewApi } from "@/usecase/shared/MockDataviewApi";
import { CodeBlockLoader } from "./codeBlockLoader";

describe("CodeBlockLoader", () => {
	beforeEach(() => {
		const DataviewAPI = new MockDataviewApi();
		vi.stubGlobal("DataviewAPI", DataviewAPI);
	});
	const codeBlock = `{
  events: dv.pages('"inbox"')
    .map(p => ({
			file: p.file,
      title: p.file.name,
      allDay: false
    })),
  options: {}
}`;
	const codeBlockLoader = new CodeBlockLoader();

	it("Can be created successfully", async () => {
		await expect(
			codeBlockLoader.execute(codeBlock),
		).resolves.not.toThrowError();
	});

	it("Error when there is no Dataview", async () => {
		vi.unstubAllGlobals();
		await expect(codeBlockLoader.execute(codeBlock)).rejects.toThrow(
			"Please install Dataview plugin",
		);
	});
});
