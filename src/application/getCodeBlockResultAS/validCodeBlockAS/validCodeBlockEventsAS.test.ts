import { Event } from "@/domain/model/event/event";
import { ValidCodeBlockEventsAS } from "./validCodeBlockEventsAS";

describe("ValidCodeBlockEventsAS", () => {
	const options = {
		dateFormat: "YYYY-MM-DD",
		startKey: "start",
		defaultDate: { type: "today" },
		defaultView: "month",
		calendarHeight: 500,
		eventFontSize: "xs",
		eventRowType: { type: "oneLine" },
		language: "en",
	} as const;
	it("should return an array of Event when given valid input data", () => {
		const events = new ValidCodeBlockEventsAS(options).execute([
			{
				file: {
					path: "foo.md",
					frontmatter: { title: "example", start: "2024-09-05" },
				},
				title: "example",
			},
		]);
		expect(events).toBeTypeOf("object");
		expect(events[0]).toBeInstanceOf(Event);
	});

	it("should throw an error when given invalid input data", () => {
		expect(() =>
			new ValidCodeBlockEventsAS(options).execute({}),
		).toThrowError();
	});
});
