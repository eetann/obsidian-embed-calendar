import { DateTime } from "./dateTime/dateTime";
import type { Metadata } from "./metadata/metadata";
import type { Path } from "./path/path";
import type { Title } from "./title/title";

export class Event {
	private constructor(
		private _path: Path,
		private _title: Title,
		private _dateTime: DateTime,
		private _metadata: Metadata,
	) {}

	static create(
		path: Path,
		title: Title,
		dateTime: DateTime,
		metadata: Metadata,
	) {
		return new Event(path, title, dateTime, metadata);
	}

	static reconstruct(
		path: Path,
		title: Title,
		dateTime: DateTime,
		metadata: Metadata,
	) {
		return new Event(path, title, dateTime, metadata);
	}

	changeDateTime(start: string, end: string) {
		const dateTime = new DateTime({
			start,
			end,
			allDay: this._dateTime.allDay,
			format: this._dateTime.format,
		});
		this._dateTime = dateTime;
	}

	get path() {
		return this._path;
	}

	get title() {
		return this._title;
	}

	get dateTime() {
		return this._dateTime;
	}

	get start() {
		return this._dateTime.startDate;
	}

	get end() {
		return this._dateTime.endDate;
	}

	get allDay() {
		return this._dateTime.allDay;
	}

	get metadata() {
		return this._metadata;
	}
}
