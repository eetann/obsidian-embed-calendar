import { DateTime } from "./dateTime/dateTime";
import { Event } from "./event";
import { Metadata } from "./metadata/metadata";
import { Path } from "./path/path";
import { Title } from "./title/title";

describe("Event", () => {
	const path = new Path("inbox/example.md");
	const title = new Title("Birthday");
	const format = "YYYY-MM-DD";
	const dateTime0901 = new DateTime({ date: "2024-09-01", format });
	const dateTime0902 = new DateTime({ date: "2024-09-02", format });
	const dateTime0903 = new DateTime({ date: "2024-09-03", format });
	const allDay = true;
	const metadata = new Metadata(undefined);
	it("reconstruct", () => {
		const event = Event.reconstruct(
			path,
			title,
			dateTime0901,
			dateTime0901,
			allDay,
			metadata,
		);

		expect(event.path.equals(path)).toBeTruthy();
		expect(event.title.equals(title)).toBeTruthy();
		expect(event.startDateTime.equals(dateTime0901)).toBeTruthy();
		expect(event.endDateTime.equals(dateTime0901)).toBeTruthy();
		expect(event.allDay).toBeTruthy();
		expect(event.metadata.equals(metadata)).toBeTruthy();
	});
	it("Error if date range is wrong", () => {
		expect(() =>
			Event.reconstruct(
				path,
				title,
				dateTime0902,
				dateTime0901,
				allDay,
				metadata,
			),
		).toThrow("startDateTime should be past endDateTime");
	});
	describe("changeDateTime", () => {
		const event = Event.reconstruct(
			path,
			title,
			dateTime0901,
			dateTime0902,
			allDay,
			metadata,
		);
		it("Expect correct conversion results for valid formats", () => {
			event.changeDateTime(dateTime0902, dateTime0903);
			expect(event.startDateTime).toEqual(dateTime0902);
			expect(event.endDateTime).toEqual(dateTime0903);
		});
		it("Error if date range is wrong", () => {
			expect(() => event.changeDateTime(dateTime0903, dateTime0901)).toThrow(
				"startDateTime should be past endDateTime",
			);
		});
	});
});
