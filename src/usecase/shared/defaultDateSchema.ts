import * as v from "valibot";

export const DefaultDateVariant = v.variant("type", [
	v.object({ type: v.literal("today") }),
	v.object({
		type: v.literal("fixed"),
		date: v.pipe(v.string(), v.nonEmpty()),
	}),
	// TODO: Implemented at src/calendar/Calendar.tsx
	// v.object({
	// 	type: v.literal("frontmatter"),
	// 	key: v.pipe(v.string(), v.nonEmpty()),
	// }),
]);
export const DefaultDateSchema = v.optional(DefaultDateVariant, {
	type: "today",
});

export type DefaultDateType = v.InferOutput<typeof DefaultDateSchema>;
