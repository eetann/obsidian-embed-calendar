import { ValidCodeBlockEventsAS } from "./validCodeBlockEventsAS";

describe("ValidCodeBlockEventsAS", () => {
	describe("#execute", () => {
		it("should return an array of events when given valid input data", () => {
			const result = new ValidCodeBlockEventsAS().execute([
				{
					file: {
						path: "foo.md",
						frontmatter: { title: "example", start: "2024-09-05" },
					},
					title: "example",
				},
			]);
			expect(result).toBeTypeOf("object");
			expect(result[0].file.path).toBe("foo.md");
			expect(result[0].file).toHaveProperty("frontmatter");
			expect(result[0].title).toBe("example");
			expect(result[0].allDay).toBeTruthy();
		});

		it("should throw an error when given invalid input data", () => {
			expect(() => new ValidCodeBlockEventsAS().execute({})).toThrowError();
		});
	});
});
