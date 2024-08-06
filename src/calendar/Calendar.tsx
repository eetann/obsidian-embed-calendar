import dayjs from "dayjs";
import "dayjs/locale/ja";
// Cannot get type if called directly `from "obsidian-dataview"`
import type { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
import { useEffect, useMemo, useState } from "react";
import {
	Calendar as BigCalendar,
	type Event,
	dayjsLocalizer,
} from "react-big-calendar";

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
	// 他のメッセージもカスタマイズできます
};

type Props = {
	pages: ReturnType<DataviewApi["pages"]>;
};

export default function Calendar({ pages }: Props) {
	const { defaultDate } = useMemo(
		() => ({
			defaultDate: dayjs("2024-08-05").toDate(),
		}),
		[],
	);
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const _events = pages
			.map((p) => ({
				// TODO: タイトルかパスか選択
				title: p.file.path,
				start: dayjs("2024-08-12").toDate(),
				end: dayjs("2024-08-13").toDate(),
				allDay: true,
			}))
			.array();
		setEvents(_events);
	}, [pages]);

	return (
		<div className="h-[500px]">
			<BigCalendar
				defaultDate={defaultDate}
				events={events}
				localizer={localizer}
				formats={formats}
				messages={messages}
				culture="ja"
			/>
		</div>
	);
}
