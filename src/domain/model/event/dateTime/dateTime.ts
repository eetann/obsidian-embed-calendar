import { ValueObject } from "@/domain/model/shared/valueObject";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

type DateTimeType = {
	start: string;
	end: string;
	allDay: boolean;
	format: string;
};

export class DateTime extends ValueObject<DateTimeType, "DateTime"> {
	validate(value: DateTimeType): void {
		const start = dayjs(value.start, value.format);
		const end = dayjs(value.end, value.format);
		if (!start.isValid()) {
			throw new Error("start is not valid");
		}
		if (!end.isValid()) {
			throw new Error("end is not valid");
		}
		if (start.isAfter(end)) {
			throw new Error("start should be past end");
		}
	}

	get start() {
		return dayjs(this.value.start, this.value.format);
	}

	get end() {
		return dayjs(this.value.end, this.value.format);
	}

	get allDay() {
		return this.value.allDay;
	}

	get format() {
		return this.value.format;
	}
}
