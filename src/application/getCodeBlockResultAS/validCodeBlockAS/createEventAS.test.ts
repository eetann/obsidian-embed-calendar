import { CreateEventAS } from "./createEventAS";

describe("createEventAS", () => {
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
	const createEventAS = new CreateEventAS(defaultOptions);

	it("Event is created when a valid value is entered", () => {
		const event = createEventAS.execute(codeBlockEvent);
		expect(event.path).not.toBeNull();
	});

	it("If there is no endKey, it is the same as startKey.", () => {
		const event = createEventAS.execute(codeBlockEvent);
		expect(event.endDateTime).toEqual(event.startDateTime);
	});

	it("If endKey is specified, the date will be the date specified by endKey, not startKey", () => {
		const options = { ...defaultOptions, endKey: "end" };
		const createEventAS = new CreateEventAS(options);
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
		const event = createEventAS.execute(codeBlockEvent);
		expect(event.endDateTime).not.toEqual(event.startDateTime);
	});
});
