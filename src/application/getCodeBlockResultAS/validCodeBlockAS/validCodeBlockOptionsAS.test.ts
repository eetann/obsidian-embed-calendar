import { ValidCodeBlockOptionsAS } from "./validCodeBlockOptionsAS";

describe("validCodeBlockOptionsAS.test", () => {
	const validCodeBlockOptionsAS = new ValidCodeBlockOptionsAS();
	const minimumOptions = { dateFormat: "YYYY-MM-DD", startKey: "start" };
	const errorMessage = "Failed to parse options\n";
	const expectMinimumOptions = {
		...minimumOptions,
		defaultDate: { type: "today" },
		defaultView: "month",
		calendarHeight: 500,
		eventFontSize: "xs",
		eventRowType: { type: "oneLine" },
		language: "en",
	};
	it("Pass a minimum input and it will be returned with default values", () => {
		expect(validCodeBlockOptionsAS.execute(minimumOptions)).toEqual(
			expectMinimumOptions,
		);
	});

	it("Error if dateFormat is empty", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({ ...minimumOptions, dateFormat: "" }),
		).toThrow(`${errorMessage}dateFormat: Write at least one character`);
	});

	it("Error if startKey is empty", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({ ...minimumOptions, startKey: "" }),
		).toThrow(`${errorMessage}startKey: Write at least one character`);
	});

	it("Error if endKey exists and is empty", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({ ...minimumOptions, endKey: "" }),
		).toThrow(`${errorMessage}endKey: Write at least one character`);
	});

	it("Error if a non-existent view is specified", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({
				...minimumOptions,
				defaultView: "ninja",
			}),
		).toThrow(
			`${errorMessage}defaultView: Expected "month" | "week" | "work_week" | "day" | "agenda"`,
		);
	});

	it("Error if calendarHeight is less than 200", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({
				...minimumOptions,
				calendarHeight: 199,
			}),
		).toThrow(`${errorMessage}calendarHeight: Change to 200 or more`);
	});

	it("Error if a non-existent eventFontSize is specified", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({
				...minimumOptions,
				eventFontSize: "ninja",
			}),
		).toThrow(
			`${errorMessage}eventFontSize: Expected "xs" | "sm" | "base" | "lg" | "xs"`,
		);
	});

	it("Error if a non-existent eventRowType.type is specified", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({
				...minimumOptions,
				eventRowType: { type: "ninja" },
			}),
		).toThrow(
			`${errorMessage}eventRowType.type: Expected "oneLine" | "auto" | "manual"`,
		);
	});

	it("Error if eventRowType.rowNumber is less than 1 when eventRowType is auto", () => {
		expect(() =>
			validCodeBlockOptionsAS.execute({
				...minimumOptions,
				eventRowType: { type: "auto", rowNumber: 0 },
			}),
		).toThrow(`${errorMessage}eventRowType.rowNumber: Change to 1 or more.`);
	});
});
