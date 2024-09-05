import { DateTime } from "@/domain/model/event/dateTime/dateTime";
import { Event } from "@/domain/model/event/event";
import {
	Metadata,
	type MetadataType,
} from "@/domain/model/event/metadata/metadata";
import { Path } from "@/domain/model/event/path/path";
import { Title } from "@/domain/model/event/title/title";
import type { OptionsType } from "./validCodeBlockOptionsAS";

type CodeBlockEvent = {
	file: {
		path: string;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		frontmatter: Record<string, any>;
	};
	title: string;
	allDay: boolean;
	metadata: MetadataType;
};
export class CreateEventAS {
	private _options: OptionsType;
	constructor(options: OptionsType) {
		this._options = options;
	}
	execute(event: CodeBlockEvent): Event {
		const start = String(event.file.frontmatter[this._options.startKey]);
		let end = start;
		if (this._options.endKey) {
			end = String(event.file.frontmatter[this._options.endKey]);
		}
		return Event.reconstruct(
			new Path(event.file.path),
			new Title(event.title),
			new DateTime({ date: start, format: this._options.dateFormat }),
			new DateTime({ date: end, format: this._options.dateFormat }),
			event.allDay,
			new Metadata(event.metadata),
		);
	}
}
