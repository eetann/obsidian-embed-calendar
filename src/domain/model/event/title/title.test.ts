import { Title } from "./title";

describe("Title", () => {
	it("Expect correct conversion results for valid formats", () => {
		expect(new Title("a").value).toBe("a");
	});
	it("should throw an error if the title is less than 1 letter long", () => {
		expect(() => new Title("")).toThrow("Title must be at least 1 letter");
	});
});
