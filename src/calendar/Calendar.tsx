import dayjs from "dayjs";
import "dayjs/locale/ja";
// Cannot get type if called directly `from "obsidian-dataview"`
// import type { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
import { useMemo } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import type { Event } from "src/code";

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

type EventLinkProps = {
	event: Event;
};

function EventLink({ event }: EventLinkProps) {
	return (
		<span>
			<a
				target="_blank"
				rel="noreferrer noopener"
				className="internal-link text-white no-underline"
				data-href={event.resource.link}
				href={event.resource.link}
			>
				{event.title ?? "undefined"}
			</a>
		</span>
	);
}

type Props = {
	events: Event[];
};

export default function Calendar({ events }: Props) {
	// TODO: 今日か、固定か、frontmatterと紐づけか
	const { components, defaultDate } = useMemo(
		() => ({
			components: {
				event: EventLink,
			},
			defaultDate: dayjs("2024-08-05").toDate(),
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
				onSelectEvent={onSelectEvent}
				components={components}
			/>
		</div>
	);
}
