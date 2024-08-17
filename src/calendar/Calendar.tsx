import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useEffect, useMemo } from "react";
import {
	Calendar as BigCalendar,
	type EventWrapperProps,
	type Formats,
	type Messages,
	dayjsLocalizer,
} from "react-big-calendar";
import type { Options } from "src/options";
import type { Event } from "src/parseSource";
import EventWrapper from "./EventWrapper";
import "./overwrite.css";
// Cannot get type if called directly `from "obsidian-dataview"`
// import type { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";

const localizer = dayjsLocalizer(dayjs);

const formats: Formats = {
	dayFormat: "MM/DD(ddd)",
	monthHeaderFormat: "YYYY年MM月",
	// dayRangeHeaderFormat: ""
	timeGutterFormat: "HH:mm",
	dayHeaderFormat: "MM月DD日(ddd)",
};

const messages: Messages = {
	date: "日時",
	time: "時間",
	event: "予定",
	allDay: "終日",
	next: "次",
	previous: "前",
	today: "今日",
	yesterday: "昨日",
	tomorrow: "明日",
	month: "月",
	week: "週",
	work_week: "月～金",
	day: "日",
	agenda: "アジェンダ",
};

type Props = {
	events: Event[];
	options: Options;
};

export default function Calendar({ events, options }: Props) {
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
				formats={formats}
				messages={messages}
				culture="ja"
				defaultDate={defaultDate}
				events={events}
				components={components}
				defaultView={options.defaultView}
				views={["month", "week", "work_week", "day", "agenda"]}
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
