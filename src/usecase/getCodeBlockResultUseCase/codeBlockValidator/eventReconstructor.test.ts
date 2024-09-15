import { EventReconstructor } from "./eventReconstructor";

describe("EventReconstructor", () => {
	const defaultOptions = {
		dateFormat: "YYYY-MM-DDTHH:mm:ss",
		startKey: "start",
		defaultDate: { type: "today" },
		defaultView: "month",
		calendarHeight: 500,
		eventFontSize: "xs",
		eventRowType: { type: "oneLine" },
		language: "en",
	} as const;
	const codeBlockEvent = {
		file: {
			path: "foo.md",
			frontmatter: {
				title: "example",
				start: "2024-09-05T12:00:00",
			},
		},
		title: "example",
		allDay: false,
		metadata: undefined,
	};
	const eventReconstructor = new EventReconstructor(defaultOptions);

	it("Event is created when a valid value is entered", () => {
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.path).not.toBeNull();
	});

	it("If there is no endKey in options, it is the same as startKey and allDay is true.", () => {
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.dateTime.endDate).toEqual(event.dateTime.startDate);
		expect(event.dateTime.allDay).toBeTruthy();
	});

	it("If endKey is specified, end date/time becomes endKey and allDay remains input", () => {
		const options = { ...defaultOptions, endKey: "end" };
		const eventReconstructor = new EventReconstructor(options);
		const codeBlockEvent = {
			file: {
				path: "foo.md",
				frontmatter: {
					title: "example",
					start: "2024-09-05T12:00:00",
					end: "2024-09-06T12:00:00",
				},
			},
			title: "example",
			allDay: false,
			metadata: undefined,
		};
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.dateTime.endDate).not.toEqual(event.dateTime.startDate);
		expect(event.dateTime.allDay).toBeFalsy();
	});
});
