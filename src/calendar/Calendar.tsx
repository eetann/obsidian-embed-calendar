import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import {
	Calendar as BigCalendar,
	type EventWrapperProps,
	dayjsLocalizer,
} from "react-big-calendar";
import type { Options } from "src/options";
import type { Event } from "src/parseSource";
import EventWrapper from "./EventWrapper";
import "./overwrite.css";
import { cultures } from "./localization";

const localizer = dayjsLocalizer(dayjs);

type Props = {
	events: Event[];
	options: Options;
};

export default function Calendar({ events, options }: Props) {
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
			eventWrapper: (eventWrapperProps: EventWrapperProps) =>
				EventWrapper(eventWrapperProps),
		}),
		[],
	);
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--rbc-event-row-number",
			options.eventRowNumber.toString(),
		);
	}, [options]);

	return (
		<div
			className="bg-[var(--background-primary)] overflow-scroll"
			style={{
				height: `${options.calendarHeight}px`,
			}}
		>
			<BigCalendar
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
			/>
		</div>
	);
}
