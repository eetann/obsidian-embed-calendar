import { DateTime } from "./dateTime/dateTime";
import { Event } from "./event";
import { Metadata } from "./metadata/metadata";
import { Path } from "./path/path";
import { Title } from "./title/title";

describe("Event", () => {
	const path = new Path("inbox/example.md");
	const title = new Title("Birthday");
	const format = "YYYY-MM-DD";
	const startDateTime = new DateTime({ date: "2024-09-03", format });
	const endDateTime = new DateTime({ date: "2024-09-03", format });
	const metadata = new Metadata(undefined);
	it("reconstruct", () => {
		const event = Event.reconstruct(
			path,
			title,
			startDateTime,
			endDateTime,
			metadata,
		);

		expect(event.path.equals(path)).toBeTruthy();
		expect(event.title.equals(title)).toBeTruthy();
		expect(event.startDateTime.equals(startDateTime)).toBeTruthy();
		expect(event.endDateTime.equals(endDateTime)).toBeTruthy();
		expect(event.metadata.equals(metadata)).toBeTruthy();
	});
	it("Error if date range is wrong", () => {
		expect(() =>
			Event.reconstruct(
				path,
				title,
				startDateTime,
				new DateTime({ date: "2024-09-02", format }),
				metadata,
			),
		).toThrow("startDateTime should be past endDateTime");
	});
});
