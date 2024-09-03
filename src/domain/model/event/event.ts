import type { DateTime } from "./dateTime/dateTime";
import type { Metadata } from "./metadata/metadata";
import type { Path } from "./path/path";
import type { Title } from "./title/title";

export class Event {
	private constructor(
		private _path: Path,
		private _title: Title,
		private _startDateTime: DateTime,
		private _endDateTime: DateTime,
		private _allDay: boolean,
		private _metadata: Metadata,
	) {}

	static reconstruct(
		path: Path,
		title: Title,
		startDateTime: DateTime,
		endDateTime: DateTime,
		allDay: boolean,
		metadata: Metadata,
	) {
		Event.validate(startDateTime, endDateTime);
		return new Event(path, title, startDateTime, endDateTime, allDay, metadata);
	}

	private static validate(
		startDateTime: DateTime,
		endDateTime: DateTime,
	): void {
		if (startDateTime.dateTime.isAfter(endDateTime.dateTime)) {
			throw new Error("startDateTime should be past endDateTime");
		}
	}

	// TODO: allDayとして変更なのか、日時なのか分岐(Rbcの都合なのでASでやる)
	changeDateTime(startDateTime: DateTime, endDateTime: DateTime) {
		Event.validate(startDateTime, endDateTime);
		this._startDateTime = startDateTime;
		this._endDateTime = endDateTime;
	}

	get path() {
		return this._path;
	}

	get title() {
		return this._title;
	}

	get startDateTime() {
		return this._startDateTime;
	}

	get endDateTime() {
		return this._endDateTime;
	}

	get allDay() {
		return this._allDay;
	}

	get metadata() {
		return this._metadata;
	}
}
