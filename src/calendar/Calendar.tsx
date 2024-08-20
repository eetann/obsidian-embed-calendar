import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import type { OptionsType } from "src/options";
import type { Event } from "src/parseSource";
import EventWrapper from "./EventWrapper";
import "./overwrite.css";
import { applyRowTypeStyle } from "./eventRowType";
import { cultures } from "./localization";
import { useDnDContext } from "./context";

const DnDCalendar = withDragAndDrop(BigCalendar);
const localizer = dayjsLocalizer(dayjs);

type Props = {
	events: Event[];
	options: OptionsType;
};

export default function Calendar({ events, options }: Props) {
	// To set CSS variables for each Calendar
	const calendarId = crypto.randomUUID();
	const { setIsDrag } = useDnDContext();

	const lang = options.language;
	const defaultDateType = options.defaultDate.type;
	let defaultDate = dayjs().toDate();
	if (defaultDateType === "fixed") {
		defaultDate = options.defaultDate.date;
	} else if (defaultDateType === "frontmatter") {
		// TODO: frontmatterと紐づけ
	}
	const components = useMemo(
		() => ({
			eventWrapper: EventWrapper,
		}),
		[],
	);
	useEffect(() => {
		applyRowTypeStyle(calendarId, options.eventRowType);
	}, [options, calendarId]);

	return (
		<div
			id={calendarId}
			className="bg-[var(--background-primary)] overflow-scroll"
			style={{
				height: `${options.calendarHeight}px`,
			}}
		>
			<DnDCalendar
				draggableAccessor={(event) => true}
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
				onDragStart={() => setIsDrag(true)}
				onEventDrop={() => setIsDrag(false)}
			/>
		</div>
	);
}
