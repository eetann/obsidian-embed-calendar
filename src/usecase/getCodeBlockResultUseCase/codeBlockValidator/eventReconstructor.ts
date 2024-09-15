import { DateTime } from "@/domain/model/event/dateTime/dateTime";
import { Event } from "@/domain/model/event/event";
import {
	Metadata,
	type MetadataType,
} from "@/domain/model/event/metadata/metadata";
import { Path } from "@/domain/model/event/path/path";
import { Title } from "@/domain/model/event/title/title";
import type { OptionsType } from "./optionsValidator";

type CodeBlockEvent = {
	file: {
		path: string;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		frontmatter: Record<string, any>;
	};
	title: string;
	allDay: boolean;
	metadata?: MetadataType;
};
export class EventReconstructor {
	private _options: OptionsType;
	constructor(options: OptionsType) {
		this._options = options;
	}
	execute(event: CodeBlockEvent): Event {
		const start = String(event.file.frontmatter[this._options.startKey]);
		let end = start;
		let allDay = true;
		if (this._options.endKey) {
			end = String(event.file.frontmatter[this._options.endKey]);
			if (end) {
				allDay = event.allDay;
			}
		}
		return Event.reconstruct(
			new Path(event.file.path),
			new Title(event.title),
			new DateTime({
				start,
				end,
				allDay,
				format: this._options.dateFormat,
			}),
			new Metadata(event.metadata),
		);
	}
}
