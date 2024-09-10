import type { Event } from "@/domain/model/event/event";
import type { MetadataType } from "@/domain/model/event/metadata/metadata";

export class EventDTO {
	public readonly path: string;
	public readonly title: string;
	public readonly dateTimeStart: string;
	public readonly dateTimeEnd: string;
	public readonly allDay: boolean;
	public readonly format: string;
	public readonly metadata: MetadataType;
	// NOTE: These are rewritten on the DnD side
	// https://github.com/jquense/react-big-calendar/blob/3d9ee861dabc6a366d845350a7649f7bea5faeca/src/addons/dragAndDrop/EventContainerWrapper.js#L55-L60
	public start: Date;
	public end: Date;

	constructor(event: Event) {
		this.path = event.path.value;
		this.title = event.title.value;
		this.dateTimeStart = event.dateTime.value.start;
		this.dateTimeEnd = event.dateTime.value.end;
		this.allDay = event.dateTime.allDay;
		this.format = event.dateTime.format;
		this.metadata = event.metadata.value;
		this.start = event.dateTime.start;
		this.end = event.dateTime.end;
	}
}
