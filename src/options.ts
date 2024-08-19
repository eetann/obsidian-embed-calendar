import dayjs from "dayjs";
import * as v from "valibot";

const DefaultDateSchema = v.variant("type", [
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

const EventRowTypeSchema = v.variant("type", [
	v.object({ type: v.literal("oneLine") }),
	v.object({
		type: v.literal("auto"),
		rowNumber: v.optional(
			v.pipe(v.number(), v.minValue(0, "Change `rowNumber` to 1 or more.")),
			2,
		),
	}),
	v.object({ type: v.literal("manual") }),
]);

const OptionsSchema = v.object({
	defaultDate: v.optional(DefaultDateSchema, { type: "today" }),
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
	eventRowType: v.optional(EventRowTypeSchema, { type: "oneLine" }),
	language: v.optional(v.picklist(["en", "ja"])),
	// TODO: moreのクリックでpopupかDayか
	// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--popup
});

export type OptionsType = v.InferOutput<typeof OptionsSchema>;

export function getOptions(data: unknown): OptionsType {
	const result = v.safeParse(OptionsSchema, data);
	if (result.success) {
		return result.output;
	}
	const messages = [];
	for (const [key, value] of Object.entries(
		v.flatten<typeof OptionsSchema>(result.issues).nested ?? {},
	)) {
		messages.push(`${key}: ${value.join("\n")}`);
	}
	throw new Error(`Failed to parse \`options\` \n\n${messages.join("\n")}`);
}
