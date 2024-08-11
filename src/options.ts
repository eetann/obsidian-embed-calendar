import dayjs from "dayjs";
import * as v from "valibot";

const defaultDateSchema = v.optional(
	v.variant("type", [
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
	]),
	{ type: "today" },
);

const OptionsSchema = v.object({
	defaultDate: defaultDateSchema,
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
