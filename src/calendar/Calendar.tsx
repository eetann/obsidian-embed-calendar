import dayjs from "dayjs";
import "dayjs/locale/ja";
// Cannot get type if called directly `from "obsidian-dataview"`
// import type { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
import { useMemo } from "react";
import {
	Calendar as BigCalendar,
	type Event as RbcEvent,
	dayjsLocalizer,
	type EventProps,
} from "react-big-calendar";
import type { Event } from "src/code";
import { Options } from "src/options";

const localizer = dayjsLocalizer(dayjs);

const formats = {
	monthHeaderFormat: "YYYY/MM",
};

const messages = {
	next: "次",
	previous: "前",
	today: "今日",
	month: "月",
	week: "週",
	day: "日",
	agenda: "アジェンダ",
};

type EventComponentProps = {
	event: Event;
};

function EventComponentProps({ event }: EventProps) {
	return (
		<a
			target="_blank"
			rel="noreferrer noopener"
			className="internal-link text-white no-underline block"
			data-href={event.resource.link}
			href={event.resource.link}
		>
			{event.title ?? "undefined"}
		</a>
	);
}

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
			event: (eventProps: EventProps) => EventComponentProps(eventProps),
		}),
		[],
	);

	const onSelectEvent = (calEvent: Event) => {
		console.log(calEvent.resource.link);
	};

	return (
		<div className="h-[500px]">
			<BigCalendar
				localizer={localizer}
				formats={formats}
				messages={messages}
				culture="ja"
				defaultDate={defaultDate}
				events={events}
				components={components}
				onSelectEvent={onSelectEvent}
				defaultView={options.defaultView}
				views={["month", "week", "work_week", "day", "agenda"]}
			/>
		</div>
	);
}
