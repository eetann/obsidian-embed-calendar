import dayjs from "dayjs";
import { DateTime } from "./dateTime/dateTime";
import { Event } from "./event";
import { Metadata } from "./metadata/metadata";
import { Path } from "./path/path";
import { Title } from "./title/title";

describe("Event", () => {
	const path = new Path("inbox/example.md");
	const title = new Title("Birthday");
	const format = "YYYY-MM-DD";
	const dateTime = new DateTime({
		start: "2024-09-01",
		end: "2024-09-01",
		allDay: true,
		format,
	});
	const metadata = new Metadata(undefined);
	it("reconstruct", () => {
		const event = Event.reconstruct(path, title, dateTime, metadata);

		expect(event.path.equals(path)).toBeTruthy();
		expect(event.title.equals(title)).toBeTruthy();
		expect(event.dateTime.equals(dateTime)).toBeTruthy();
		expect(event.metadata.equals(metadata)).toBeTruthy();
	});
	describe("changeDateTime", () => {
		const event = Event.reconstruct(path, title, dateTime, metadata);
		it("Expect correct conversion results for valid formats", () => {
			event.changeDateTime("2024-09-02", "2024-09-03");
			expect(event.dateTime.start).toEqual(
				dayjs("2024-09-02", format).toDate(),
			);
			expect(event.dateTime.end).toEqual(dayjs("2024-09-03", format).toDate());
		});
		// TODO: ここから
		it("Error if date range is wrong", () => {
			expect(() => event.changeDateTime("2024-09-02", "2024-09-01")).toThrow(
				"start should be past end",
			);
		});
	});
});
