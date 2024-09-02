import { Path } from "./path";

describe("Path", () => {
	describe("#validate", () => {
		it("should throw an error if the path is less than 1 letter long", () => {
			expect(() => new Path("")).toThrow("Path must be at least 1 letter");
		});

		it("should not throw an error if the path is at least 1 letter long", () => {
			expect(() => new Path("a")).not.toThrow("Path must be at least 1 letter");
		});
	});
});
