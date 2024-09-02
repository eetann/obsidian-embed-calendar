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
		private _metadata: Metadata,
	) {}

	static reconstruct(
		path: Path,
		title: Title,
		startDateTime: DateTime,
		endDateTime: DateTime,
		metadata: Metadata,
	) {
		return new Event(path, title, startDateTime, endDateTime, metadata);
	}

	changeStartDateTime(dateTime: DateTime) {
		this._startDateTime = dateTime;
	}

	changeEndDateTime(dateTime: DateTime) {
		this._endDateTime = dateTime;
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

	get metadata() {
		return this._metadata;
	}
}
