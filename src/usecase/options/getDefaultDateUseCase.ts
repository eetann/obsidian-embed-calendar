import dayjs from "dayjs";
import type { DefaultDateType } from "../shared/defaultDateSchema";

export class GetDefaultDateUseCase {
	execute(value: DefaultDateType) {
		if (value.type === "fixed") {
			return dayjs(value.date).toDate();
		}
		// TODO: value.type === "frontmatter"

		return dayjs().toDate();
	}
}
