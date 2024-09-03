import { ValueObject } from "@/domain/model/shared/valueObject";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

type DateTimeType = {
	date: string;
	format: string;
};

export class DateTime extends ValueObject<DateTimeType, "DateTime"> {
	validate(value: DateTimeType): void {
		if (!dayjs(value.date).isValid()) {
			throw new Error("DateTime is not valid");
		}
	}

	get dateTime() {
		return dayjs(this.value.date, this.value.format);
	}
}
