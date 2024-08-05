import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useMemo } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";

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

export default function Calendar() {
	const { defaultDate } = useMemo(
		() => ({
			defaultDate: new Date(2015, 3, 13),
		}),
		[],
	);
	return (
		<div className="h-[500px]">
			<BigCalendar
				defaultDate={defaultDate}
				localizer={localizer}
				formats={formats}
				messages={messages}
				culture="ja"
			/>
		</div>
	);
}
