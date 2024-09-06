import { MockDataviewApi } from "@/usecase/shared/MockDataviewApi";
import { LoadCodeBlockAS } from "./loadCodeBlockAS";

describe("LoadCodeBlockAS", () => {
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
	const loadCodeBlockAS = new LoadCodeBlockAS();

	it("Can be created successfully", async () => {
		await expect(
			loadCodeBlockAS.execute(codeBlock),
		).resolves.not.toThrowError();
	});

	it("Error when there is no Dataview", async () => {
		vi.unstubAllGlobals();
		await expect(loadCodeBlockAS.execute(codeBlock)).rejects.toThrow(
			"Please install Dataview plugin",
		);
	});
});
