import "./overwrite.css";
import type { EventDTO } from "@/usecase/event/eventDTO";
import dayjs from "dayjs";
import { type Plugin, TFile } from "obsidian";
import { useEffect, useMemo } from "react";
import {
	type Components,
	Calendar as RbcCalendar,
	type ToolbarProps,
	dayjsLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDnDContext } from "./provider/DnDContextProvider";
import EventContent from "./rbcCalendar/EventContent";
import { Toolbar } from "./rbcCalendar/Toolbar";
import { applyRowTypeStyle } from "./rbcCalendar/applyRowTypeStyle";
import { CreateEvent } from "./rbcCalendar/handler/createEvent";
import { UpdateEvent } from "./rbcCalendar/handler/updateEvent";
import { cultures } from "./rbcCalendar/localization";
import { useCodeBlock } from "./useCodeBlock";
import { useDefaultDate } from "./useDefaultDate";

const DnDCalendar = withDragAndDrop<EventDTO>(RbcCalendar);
const localizer = dayjsLocalizer(dayjs);

interface EmbedCalendarPlugin extends Plugin {
	currentDateDict?: { [x: string]: Date };
}

type Props = {
	plugin: EmbedCalendarPlugin;
	rawEvents: unknown;
	rawOptions: unknown;
};

export default function Calendar({ plugin, rawEvents, rawOptions }: Props) {
	// To set CSS variables for each Calendar
	const { options, events, setEvents, error } = useCodeBlock(
		plugin,
		rawEvents,
		rawOptions,
	);
	const { defaultDate, calendarId } = useDefaultDate(plugin, options);
	const { setIsDrag } = useDnDContext();
	const components: Components<EventDTO> = useMemo(
		() => ({
			event: EventContent,
			toolbar: (props: ToolbarProps) => (
				<Toolbar {...props} defaultDate={defaultDate} />
			),
		}),
		[defaultDate],
	);

	useEffect(() => {
		if (options && calendarId) {
			applyRowTypeStyle(calendarId, options.eventRowType);
		}
	}, [options, calendarId]);

	if (error) {
		console.log(error);
		return <pre>{String(error)}</pre>;
	}

	if (!options || !events) {
		return <p>Loading...</p>;
	}

	const lang = options.language;
	const updateEvent = new UpdateEvent(plugin, options, setEvents);
	const createEvent = new CreateEvent(plugin, options, setEvents);

	return (
		<div
			id={calendarId}
			className="bg-[var(--background-primary)] overflow-scroll"
			style={{
				height: `${options.calendarHeight}px`,
			}}
		>
			<DnDCalendar
				localizer={localizer}
				// TODO: formatsは上書きできるようにする
				formats={lang ? cultures[lang]?.formats : undefined}
				messages={lang ? cultures[lang]?.messages : undefined}
				culture={lang}
				defaultDate={defaultDate}
				events={events}
				components={components}
				defaultView={options.defaultView}
				// TODO: work_weekも自由に入れられるようにオプション化
				views={["month", "week", "day"]}
				// views={["month", "week", "work_week", "day", "agenda"]}
				eventPropGetter={() => {
					let fontSize = "text-xs";
					switch (options.eventFontSize) {
						case "sm":
							fontSize = "text-sm";
							break;
						case "base":
							fontSize = "text-base";
							break;
						case "lg":
							fontSize = "text-lg";
							break;
					}
					return { className: fontSize };
				}}
				endAccessor={(event) => {
					const end = event.end;
					if (event.allDay && event.end.getHours() === 0) {
						end.setHours(12);
					}
					return end;
				}}
				onDragStart={() => {
					setIsDrag(true);
				}}
				onDragOver={() => {
					setIsDrag(false);
				}}
				onEventDrop={(args) => {
					updateEvent.execute(args);
					setIsDrag(false);
				}}
				onEventResize={(args) => {
					updateEvent.execute(args);
					setIsDrag(false);
				}}
				onDoubleClickEvent={(event) => {
					const file = plugin.app.vault.getAbstractFileByPath(event.path);
					if (file instanceof TFile) {
						plugin.app.workspace.getLeaf().openFile(file);
					}
				}}
				selectable={true}
				onSelectSlot={(slotInfo) => {
					createEvent.execute(slotInfo);
				}}
				onNavigate={(newDate) => {
					if (plugin?.currentDateDict) {
						plugin.currentDateDict[calendarId] = newDate;
					}
				}}
			/>
		</div>
	);
}
