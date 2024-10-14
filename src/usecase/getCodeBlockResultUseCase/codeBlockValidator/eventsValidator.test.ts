import { EventDTO } from "@/usecase/event/eventDTO";
import { EventsValidator } from "./eventsValidator";

describe("EventsValidator", () => {
	const options = {
		dateFormat: "YYYY-MM-DD",
		startKey: "start",
		newNoteFolder: "inbox",
		newNoteNameType: { type: "date", format: "YYYYMMDDHHmmss" },
		newNoteMethodType: { type: "scratch" },
		defaultDateType: { type: "today" },
		defaultView: "month",
		calendarHeight: 500,
		eventFontSize: "xs",
		eventRowType: { type: "oneLine" },
		language: "en",
	} as const;
	it("should return an array of Event when given valid input data", () => {
		const events = new EventsValidator(options).execute([
			{
				file: {
					path: "foo.md",
					frontmatter: { title: "example", start: "2024-09-05" },
				},
				title: "example",
			},
		]);
		expect(events).toBeTypeOf("object");
		expect(events[0]).toBeInstanceOf(EventDTO);
	});

	it("should throw an error when given invalid input data", () => {
		expect(() => new EventsValidator(options).execute({})).toThrow(
			"Failed to parse events\nevents should be an array.",
		);
	});
});
