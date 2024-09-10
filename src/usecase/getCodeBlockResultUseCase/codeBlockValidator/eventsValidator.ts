import { EventDTO } from "@/usecase/event/eventDTO";
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
	private _EventSchema;
	constructor(options: OptionsType) {
		this._eventReconstructor = new EventReconstructor(options);
		this._EventSchema = v.pipe(
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
	}

	execute(data: unknown) {
		const _result = v.safeParse(v.array(v.unknown()), data);
		if (!_result.success) {
			throw new Error("Failed to parse events\nevents should be an array.");
		}
		const events: EventDTO[] = [];
		for (const event of _result.output) {
			const result = v.safeParse(this._EventSchema, event);
			if (!result.success) {
				// TODO: エラーのあったeventは別途表示
				throw new Error(
					`Failed to parse events\n${getMessages(result.issues)}`,
				);
			}
			events.push(new EventDTO(result.output));
		}
		console.log(events);
		return events;
	}
}
