import dayjs from "dayjs";
import type { Event } from "react-big-calendar";

async function executeScript(source: string) {
	const script = source;
	const func = new Function(
		`return new Promise((s,r)=>{(async ()=>{
      const dv = DataviewAPI;
      return ${script};
      })().then(s).catch(r)})`,
	);
	return await func();
}

type RawEvent = {
	title: string;
	start: string;
	end: string;
	allDay?: boolean;
};

type Options = {
	test?: boolean;
};

type CalendarData = {
	events: Event[];
	options: Options;
};

type RawCalendarData = {
	events: RawEvent[];
	options: Options;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isRawCalendarData(obj: any): obj is RawCalendarData {
	if (typeof obj !== "object" || obj === null) {
		return false;
	}
	if (!Array.isArray(obj.events)) {
		return false;
	}
	if (typeof obj.options !== "object" || obj.options === null) {
		return false;
	}
	return true;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isRawEvent(event: any): event is RawEvent {
	if (typeof event !== "object" || event === null) {
		return false;
	}
	if (
		typeof event.title !== "string" ||
		typeof event.start !== "string" ||
		typeof event.end !== "string"
	) {
		return false;
	}
	return true;
}

export async function parseCalendarData(source: string): Promise<CalendarData> {
	const value = await executeScript(source);
	if (!isRawCalendarData(value)) {
		throw new Error("could't parse code");
	}
	const events: Event[] = [];
	for (const event of value.events) {
		if (!isRawEvent(event)) {
			continue;
		}
		// TODO: formatを指定する
		events.push({
			...event,
			start: dayjs(event.start).toDate(),
			// TODO: endが無ければstartと同じにする
			end: dayjs(event.end).toDate(),
		});
	}
	console.log(events);
	return {
		events: events,
		options: value.options,
	};
}