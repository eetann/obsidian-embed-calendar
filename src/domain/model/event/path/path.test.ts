import { Path } from "./path";

describe("Path", () => {
	it("Expect correct conversion results for valid formats", () => {
		expect(new Path("a").value).toBe("a");
	});
	it("should throw an error if the path is less than 1 letter long", () => {
		expect(() => new Path("")).toThrow("Path must be at least 1 letter");
	});
});
