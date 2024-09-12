import type { EventDTO } from "@/usecase/event/eventDTO";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";

export function onEventDrop({
	event,
	start,
	end,
	isAllDay,
}: EventInteractionArgs<EventDTO>): void {
	console.log("onEventDrop");
	// event.changeDateTime(start.toString(), end.toString());
	// TODO: スタートの書き換え
	// TODO: frontmatterを書き換えるには file が必要かも
	// TODO: endの書き換え
}
