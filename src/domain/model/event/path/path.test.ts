import { Path } from "./path";

describe("Path", () => {
	it("Expect correct conversion results for valid formats", () => {
		expect(new Path("a.md").value).toBe("a.md");
	});
	it("Error if the path is 1 letter", () => {
		expect(() => new Path("")).toThrow("Path must be at least 4 letter");
	});
	it("Error if the path is not markdown", () => {
		expect(() => new Path("foo.bar")).toThrow("Path must be markdown");
	});
});
