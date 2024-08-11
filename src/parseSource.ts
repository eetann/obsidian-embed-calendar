import dayjs from "dayjs";
import type { Event as RbcEvent } from "react-big-calendar";
import { type Options, getOptions } from "./options";

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

type Resouces = {
	link: string;
};

type RawEvent = Resouces & {
	title: string;
	start: string;
	end: string;
	allDay?: boolean;
};

export interface Event extends RbcEvent {
	resource: Resouces;
}

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

function rawEventToEvent(event: RawEvent): Event {
	const end = event.end ? new Date(event.end) : new Date(event.start);
	// TODO: end < startの時のエラー
	if (event.allDay && end.getHours() === 0) {
		end.setHours(12); // 終日イベントのendが00:00だと表示されないため
	}
	return {
		title: event.title,
		start: dayjs(event.start).toDate(),
		end: end,
		allDay: event.allDay,
		resource: {
			link: event.link,
		},
	};
}

export async function parseSource(source: string): Promise<CalendarData> {
	const value = await executeScript(source);
	if (!isRawCalendarData(value)) {
		throw new Error("could't parse code");
	}
	const events: Event[] = [];
	for (const event of value.events) {
		if (!isRawEvent(event)) {
			continue;
		}
		events.push(rawEventToEvent(event));
	}
	return {
		events: events,
		options: getOptions(value.options),
	};
}
