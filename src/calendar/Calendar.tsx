import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { useMemo } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
dayjs().format();
dayjs.extend(timezone);

const localizer = dayjsLocalizer(dayjs);

export default function Calendar() {
	const { defaultDate } = useMemo(
		() => ({
			defaultDate: new Date(2015, 3, 13),
		}),
		[],
	);
	return (
		<div>
			<BigCalendar defaultDate={defaultDate} localizer={localizer} />
		</div>
	);
}
