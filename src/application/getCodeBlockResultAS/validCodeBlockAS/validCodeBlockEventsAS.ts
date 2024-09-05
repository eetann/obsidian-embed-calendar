import { getMessages } from "@/application/shared/utilValibot";
import * as v from "valibot";

const FileSchema = v.object({
	path: v.string(),
	frontmatter: v.record(v.string(), v.any()),
});

const EventSchema = v.object({
	file: FileSchema,
	title: v.pipe(
		v.string(),
		v.nonEmpty("Write at least one character"),
		v.description(
			`example: dv.pages('"inbox"').map(p => ({ title: p.file.name, ... }))`,
		),
	),
	allDay: v.optional(v.boolean(), true),
});

const EventsSchema = v.array(EventSchema);

export type EventsType = v.InferOutput<typeof EventsSchema>;

export class ValidCodeBlockEventsAS {
	execute(data: unknown): EventsType {
		const result = v.safeParse(EventsSchema, data);
		if (result.success) {
			return result.output;
		}
		throw new Error(`Failed to parse events\n${getMessages(result.issues)}`);
	}
}
