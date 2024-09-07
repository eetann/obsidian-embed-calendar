import dayjs from "dayjs";
import { DateTime } from "./dateTime";

describe("DateTime", () => {
	const date0901 = "2024-09-01";
	const date0902 = "2024-09-02";
	const format = "YYYY-MM-DD";
	it("Expect correct conversion results for valid formats", () => {
		const dateTime = new DateTime({
			start: date0901,
			end: date0902,
			allDay: true,
			format,
		});
		expect(dateTime.start).toEqual(dayjs(date0901, format).toDate());
		expect(dateTime.end).toEqual(dayjs(date0902, format).toDate());
		expect(dateTime.allDay).toBe(true);
		expect(dateTime.format).toBe(format);
	});
	it("Expect correct conversion results for valid formats", () => {
		const dateTime = new DateTime({
			start: date0901,
			end: date0901,
			allDay: true,
			format,
		});
		expect(dateTime.start).toEqual(dayjs(date0901, format).toDate());
		expect(dateTime.end).toEqual(dayjs(date0901, format).toDate());
	});

	it("Error if start is not valid", () => {
		expect(
			() =>
				new DateTime({
					start: "ninja",
					end: date0901,
					allDay: true,
					format,
				}),
		).toThrow("start is not valid");
	});

	it("Error if end is not valid", () => {
		expect(
			() =>
				new DateTime({
					start: date0901,
					end: "ninja",
					allDay: true,
					format,
				}),
		).toThrow("end is not valid");
	});

	it("Error if out of order", () => {
		expect(
			() =>
				new DateTime({
					start: date0902,
					end: date0901,
					allDay: true,
					format,
				}),
		).toThrow("start should be past end");
	});
});
