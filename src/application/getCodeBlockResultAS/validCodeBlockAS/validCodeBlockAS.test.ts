import { ValidCodeBlockAS } from "./validCodeBlockAS";

describe("ValidCodeBlockAS", () => {
	const validCodeBlockAS = new ValidCodeBlockAS();
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
			},
		};
		const result = validCodeBlockAS.execute(data);
		expect(result.options).toBeTruthy();
		expect(result.events).toBeTruthy();
	});
	it("Error when passing wrong", () => {
		const data = {};
		expect(() => validCodeBlockAS.execute(data)).toThrowError();
	});
});
