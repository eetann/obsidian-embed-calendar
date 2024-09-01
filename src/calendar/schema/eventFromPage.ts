import * as v from "valibot";
import type { Event } from "react-big-calendar";
import { getMessages } from "./utils";

const EventFromPageSchema = v.object({
	path: v.pipe(
		v.string(),
		v.nonEmpty(),
		v.regex(/.*\.md$/, "Write the path to the Markdown file"),
		v.description(
			`example: dv.pages('"inbox"').map(p => ({ path: p.file.path, ... }))`,
		),
	),
	title: v.pipe(
		v.string(),
		v.nonEmpty(),
		v.description(
			`example: dv.pages('"inbox"').map(p => ({ title: p.file.name, ... }))`,
		),
	),
	allDay: v.optional(v.boolean(), true),
});

export type EventFromPage = v.InferOutput<typeof EventFromPageSchema>;

export interface RbcEvent extends Event {
	resource: {
		path: string;
		link: string;
	}
}

function validEventFromPage(event: unknown): EventFromPage {
	const result = v.safeParse(EventFromPageSchema, event);
	if (result.success) {
		return result.output;
	}
	throw new Error(
		`Failed to parse \`events\` \n\n${getMessages(result.issues)}`,
	);
}

// TODO: file.pathを getAbstractFileByPath に渡して、それをapp.fileManager.processFrontMatter
function getRbcEvent(eventFromPage:EventFromPage, options): RbcEvent {
	const file = this.app.valut.getAbstractFileByPath(eventFromPage.path);
	file.frontmatter.
}
