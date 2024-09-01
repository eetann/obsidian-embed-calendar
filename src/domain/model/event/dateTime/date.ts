import dayjs from "dayjs";
import { ValueObject } from "domain/model/shared/valueObject";

type DateTimeType = {
	dateTime: string;
	format: string;
};

export class DateTime extends ValueObject<DateTimeType, "DateTime"> {
	validate(value: DateTimeType): void {
		if (!dayjs(value.dateTime).isValid()) {
			throw new Error("DateTime is not valid");
		}
	}

	get dateTime() {
		return dayjs(this.value.dateTime, this.value.format);
	}

	get format() {
		return this.value.format;
	}
}
