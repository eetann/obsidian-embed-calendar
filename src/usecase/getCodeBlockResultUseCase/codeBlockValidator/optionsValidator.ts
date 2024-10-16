import { DefaultDateTypeSchema } from "@/usecase/shared/defaultDateSchema";
import { getMessages } from "@/usecase/shared/utilValibot";
import * as v from "valibot";

const NonEmptySchema = v.pipe(
	v.string(),
	v.nonEmpty("Write at least one character"),
);

const EventRowTypeSchema = v.variant(
	"type",
	[
		v.object({ type: v.literal("oneLine") }),
		v.object({
			type: v.literal("auto"),
			rowNumber: v.optional(
				v.pipe(v.number(), v.minValue(1, "Change to 1 or more.")),
				2,
			),
		}),
		v.object({ type: v.literal("manual") }),
	],
	'Expected "oneLine" | "auto" | "manual"',
);

const NewNotePathTypeSchema = v.variant(
	"type",
	[
		v.object({ type: v.literal("date"), format: NonEmptySchema }),
		v.object({ type: v.literal("modal") }),
	],
	'Expected "date" | "modal"',
);

const NewNoteMethodTypeSchema = v.variant(
	"type",
	[
		v.object({ type: v.literal("copy"), path: NonEmptySchema }),
		v.object({ type: v.literal("templater"), path: NonEmptySchema }),
		v.object({ type: v.literal("scratch") }),
	],
	'Expected "copy" | "templater" | "scratch"',
);

const OptionsSchema = v.object({
	// example: YYYY-MM-DD, YYYY-MM-DDTHH:mm:ss
	dateFormat: NonEmptySchema,
	startKey: NonEmptySchema,
	endKey: v.optional(NonEmptySchema),
	newNoteFolder: NonEmptySchema,
	newNoteNameType: v.optional(NewNotePathTypeSchema, {
		type: "date",
		format: "YYYYMMDDHHmmss",
	}),
	newNoteMethodType: v.optional(NewNoteMethodTypeSchema, { type: "scratch" }),
	defaultDateType: v.optional(DefaultDateTypeSchema, { type: "today" }),
	idForKeepDate: v.optional(NonEmptySchema),
	defaultView: v.optional(
		v.picklist(
			["month", "week", "work_week", "day", "agenda"],
			'Expected "month" | "week" | "work_week" | "day" | "agenda"',
		),
		"month",
	),
	calendarHeight: v.optional(
		v.pipe(v.number(), v.minValue(200, "Change to 200 or more")),
		500,
	),
	eventFontSize: v.optional(
		v.picklist(
			["xs", "sm", "base", "lg"],
			'Expected "xs" | "sm" | "base" | "lg" | "xs"',
		),
		"xs",
	),
	eventRowType: v.optional(EventRowTypeSchema, { type: "oneLine" }),
	language: v.optional(v.picklist(["en", "ja"]), "en"),
});

export type OptionsType = v.InferOutput<typeof OptionsSchema>;

export class OptionsValidator {
	execute(data: unknown): OptionsType {
		const result = v.safeParse(OptionsSchema, data);
		if (result.success) {
			return result.output;
		}
		throw new Error(`Failed to parse options\n${getMessages(result.issues)}`);
	}
}
