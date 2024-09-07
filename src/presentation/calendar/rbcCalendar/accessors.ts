import type { Event } from "@/domain/model/event/event";

export function titleAccessor(event: Event) {
	return event.title.value;
}

export function startAccessor(event: Event) {
	return event.dateTime.start;
}

export function endAccessor(event: Event) {
	return event.dateTime.end;
}

export function allDayAccessor(event: Event) {
	return event.dateTime.allDay;
}
