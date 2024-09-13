import "./overwrite.css";
import type { EventDTO } from "@/usecase/event/eventDTO";
import { GetDefaultDateUseCase } from "@/usecase/options/getDefaultDateUseCase";
import dayjs from "dayjs";
import type { Plugin } from "obsidian";
import { useEffect, useMemo } from "react";
import { Calendar as RbcCalendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
	DnDContextProvider,
	useDnDContext,
} from "./provider/DnDContextProvider";
import EventWrapper from "./rbcCalendar/EventWrapper";
import { applyRowTypeStyle } from "./rbcCalendar/applyRowTypeStyle";
import { onEventDrop } from "./rbcCalendar/handler";
import { cultures } from "./rbcCalendar/localization";
import { useCodeBlock } from "./useCodeBlock";

const DnDCalendar = withDragAndDrop<EventDTO>(RbcCalendar);
const localizer = dayjsLocalizer(dayjs);

type Props = {
	plugin: Plugin;
	source: string;
};

export default function Calendar({ plugin, source }: Props) {
	// To set CSS variables for each Calendar
	const calendarId = crypto.randomUUID();
	const { options, events, setEvents, error } = useCodeBlock(source);
	const { setIsDrag } = useDnDContext();
	const components = useMemo(
		() => ({
			eventWrapper: EventWrapper,
		}),
		[],
	);

	useEffect(() => {
		if (options) {
			applyRowTypeStyle(calendarId, options.eventRowType);
		}
	}, [options, calendarId]);

	if (error) {
		return <pre>{String(error)}</pre>;
	}

	if (!options || !events) {
		return <p>Loading...</p>;
	}

	const lang = options.language;
	const defaultDate = new GetDefaultDateUseCase().execute(options.defaultDate);

	return (
		<div
			id={calendarId}
			className="bg-[var(--background-primary)] overflow-scroll"
			style={{
				height: `${options.calendarHeight}px`,
			}}
		>
			<DnDContextProvider>
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
					views={["month", "week", "day", "agenda"]}
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
					onDragStart={() => {
						console.log("onDragStart");
						setIsDrag(true);
					}}
					onDragOver={() => {
						console.log("onDragOver");
						setIsDrag(false);
					}}
					onEventDrop={(event) => {
						onEventDrop(event);
						setIsDrag(false);
					}}
					onEventResize={() => {
						console.log("onEventResize");
					}}
				/>
			</DnDContextProvider>
		</div>
	);
}
