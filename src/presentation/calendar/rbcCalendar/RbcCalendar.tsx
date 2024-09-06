import type { OptionsType } from "@/application/getCodeBlockResultAS/validCodeBlockAS/validCodeBlockOptionsAS";
import type { Event } from "@/domain/model/event/event";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import withDragAndDrop, {
	type withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { useDnDContext } from "../provider/DnDContextProvider";
import EventWrapper from "./EventWrapper";
import { applyRowTypeStyle } from "./applyRowTypeStyle";
import { cultures } from "./localization";

const DnDCalendar = withDragAndDrop(Calendar);
const localizer = dayjsLocalizer(dayjs);

type Props = {
	events: Event[];
	options: OptionsType;
};

export default function RbcCalendar({ events, options }: Props) {
	// To set CSS variables for each Calendar
	const calendarId = crypto.randomUUID();
	const { setIsDrag } = useDnDContext();

	const lang = options.language;
	const defaultDateType = options.defaultDate.type;
	let defaultDate = dayjs().toDate();
	if (defaultDateType === "fixed") {
		defaultDate = dayjs(options.defaultDate.date).toDate();
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

	const onEventDrop: withDragAndDropProps["onEventDrop"] = ({
		event,
		start,
		end,
	}) => {
		// TODO: スタートの書き換え
		// TODO: frontmatterを書き換えるには file が必要かも
		// event.start
		// TODO: endの書き換え
		setIsDrag(false);
	};

	return (
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
			onEventDrop={onEventDrop}
		/>
	);
}
