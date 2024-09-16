import { CodeBlockValidator } from "./codeBlockValidator";

describe("CodeBlockValidator", () => {
	const codeBlockValidator = new CodeBlockValidator();
	it("Passing the correct value returns the value", () => {
		const data = {
			events: [
				{
					file: {
						path: "foo.md",
						frontmatter: { title: "example", start: "2024-09-05" },
					},
					title: "example",
				},
			],
			options: {
				dateFormat: "YYYY-MM-DD",
				startKey: "start",
				newNoteFolder: "inbox",
			},
		};
		const result = codeBlockValidator.execute(data);
		expect(result.options).toBeTruthy();
		expect(result.events).toBeTruthy();
	});
	it("Error when passing wrong", () => {
		const data = {};
		expect(() => codeBlockValidator.execute(data)).toThrowError();
	});
});
