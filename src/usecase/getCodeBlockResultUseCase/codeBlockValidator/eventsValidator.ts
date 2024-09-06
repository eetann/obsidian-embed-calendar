import { getMessages } from "@/usecase/shared/utilValibot";
import * as v from "valibot";
import { EventReconstructor } from "./eventReconstructor";
import type { OptionsType } from "./optionsValidator";

const FileSchema = v.object({
	path: v.string(),
	frontmatter: v.record(v.string(), v.any()),
});

export class EventsValidator {
	private _eventReconstructor;
	private _EventsSchema;
	constructor(options: OptionsType) {
		this._eventReconstructor = new EventReconstructor(options);
		const EventSchema = v.pipe(
			v.object({
				file: FileSchema,
				title: v.pipe(
					v.string(),
					v.nonEmpty("Write at least one character"),
					v.description(
						`example: dv.pages('"inbox"').map(p => ({ title: p.file.name, ... }))`,
					),
				),
				allDay: v.optional(v.boolean(), true),
				metadata: v.optional(v.union([v.string(), v.instance(HTMLElement)])),
			}),
			v.transform((codeBlockEvent) => {
				return this._eventReconstructor.execute(codeBlockEvent);
			}),
		);
		this._EventsSchema = v.array(EventSchema);
	}

	execute(data: unknown) {
		const result = v.safeParse(this._EventsSchema, data);
		if (result.success) {
			return result.output;
		}
		throw new Error(`Failed to parse events\n${getMessages(result.issues)}`);
	}
}
