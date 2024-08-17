import "dayjs/locale/ja";
import type { Formats, Messages } from "react-big-calendar";

// https://day.js.org/docs/en/display/format
export const cultures: {
	[lang: string]: {
		formats: Formats;
		messages: Messages;
	};
} = {
	ja: {
		formats: {
			dayFormat: "M/D(ddd)",
			monthHeaderFormat: "YYYY/M",
			agendaHeaderFormat: ({ start, end }, culture, localizer) => {
				return `${localizer?.format(start, "YYYY/M/D/(ddd)", culture)} - ${localizer?.format(end, "YYYY/M/D(ddd)", culture)}`;
			},
			agendaDateFormat: "M/D(ddd)",
			dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
				return `${localizer?.format(start, "YYYY/M/D/(ddd)", culture)} - ${localizer?.format(end, "YYYY/M/D(ddd)", culture)}`;
			},
			timeGutterFormat: "HH:mm",
			dayHeaderFormat: "M/D(ddd)",
		},
		messages: {
			date: "日時",
			time: "時間",
			event: "予定",
			allDay: "終日",
			week: "週",
			work_week: "月～金",
			day: "日",
			month: "月",
			previous: "前",
			next: "次",
			yesterday: "昨日",
			tomorrow: "明日",
			today: "今日",
			agenda: "アジェンダ",
			noEventsInRange: "この期間に予定はありません。",
			showMore: (total) => `他 ${total} 件`,
		},
	},
	// TODO: Add other languages (refer to Google Calendar)
};
