import dayjs from "dayjs";
import * as v from "valibot";

const defaultDateSchema = v.variant("type", [
	v.object({ type: v.literal("today") }),
	v.object({
		type: v.literal("fixed"),
		date: v.pipe(
			v.string(),
			v.transform((input) => dayjs(input).toDate()),
		),
	}),
	// TODO: Implemented at src/calendar/Calendar.tsx
	v.object({ type: v.literal("frontmatter"), key: v.string() }),
]);

const OptionsSchema = v.object({
	defaultDate: v.optional(defaultDateSchema, { type: "today" }),
	defaultView: v.optional(
		v.picklist(["month", "week", "work_week", "day", "agenda"]),
		"month",
	),
	calendarHeight: v.optional(
		v.pipe(
			v.number(),
			v.minValue(200, "Change `calendarHeight` to 200 or more"),
		),
		500,
	),
	eventFontSize: v.optional(v.picklist(["xs", "sm", "base", "lg"]), "xs"),
	eventRowNumber: v.optional(
		v.pipe(v.number(), v.minValue(0, "Change `eventRowNumber` to 1 or more.")),
		1,
	),
	// TODO: moreのクリックでpopupかDayか
	// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--popup
});

export type Options = v.InferOutput<typeof OptionsSchema>;

export function getOptions(data: unknown): Options {
	const result = v.safeParse(OptionsSchema, data);
	if (result.success) {
		return result.output;
	}
	// TODO: 失敗時にissuesを投げる
	console.log(result.issues);
	throw new Error("Failed to parse optioins");
}
