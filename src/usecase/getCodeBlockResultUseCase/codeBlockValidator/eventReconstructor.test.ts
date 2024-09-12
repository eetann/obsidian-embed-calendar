import { EventReconstructor } from "./eventReconstructor";

describe("EventReconstructor", () => {
	const defaultOptions = {
		dateFormat: "YYYY-MM-DD",
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
				start: "2024-09-05",
			},
		},
		title: "example",
		allDay: true,
		metadata: undefined,
	};
	const eventReconstructor = new EventReconstructor(defaultOptions);

	it("Event is created when a valid value is entered", () => {
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.path).not.toBeNull();
	});

	it("If there is no endKey, it is the same as startKey.", () => {
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.dateTime.endDate).toEqual(event.dateTime.startDate);
	});

	it("If endKey is specified, the date will be the date specified by endKey, not startKey", () => {
		const options = { ...defaultOptions, endKey: "end" };
		const eventReconstructor = new EventReconstructor(options);
		const codeBlockEvent = {
			file: {
				path: "foo.md",
				frontmatter: {
					title: "example",
					start: "2024-09-05",
					end: "2024-09-06",
				},
			},
			title: "example",
			allDay: true,
			metadata: undefined,
		};
		const event = eventReconstructor.execute(codeBlockEvent);
		expect(event.dateTime.endDate).not.toEqual(event.dateTime.startDate);
	});
});
