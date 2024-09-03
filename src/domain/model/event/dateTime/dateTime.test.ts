import dayjs from "dayjs";
import { DateTime } from "./dateTime";

describe("DateTime", () => {
	it("Expect correct conversion results for valid formats", () => {
		const date = "2024-09-03";
		const format = "YYYY-MM-DD";
		const dateTime = new DateTime({
			date,
			format,
		});
		expect(dateTime.dateTime).toEqual(dayjs(date, format));
	});
	it("Error if date does not appear in valid format", () => {
		expect(
			() => new DateTime({ date: "foobar", format: "YYYY-MM-DD" }),
		).toThrow("DateTime is not valid");
	});
});
