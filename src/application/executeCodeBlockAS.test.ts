import { ExecuteCodeBlockAS } from "./executeCodeBlockAS";
import { MockDataviewApi } from "./shared/MockDataviewApi";

describe("ExecuteCodeBlockAS", () => {
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
	const executeCodeBlockAS = new ExecuteCodeBlockAS();

	it("Can be created successfully", async () => {
		await expect(
			executeCodeBlockAS.execute(codeBlock),
		).resolves.not.toThrowError();
	});

	it("Error when there is no Dataview", async () => {
		vi.unstubAllGlobals();
		await expect(executeCodeBlockAS.execute(codeBlock)).rejects.toThrow(
			"Please install Dataview plugin",
		);
	});
});
