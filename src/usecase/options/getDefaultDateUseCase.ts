import dayjs from "dayjs";
import type { DefaultDateTypeType } from "../shared/defaultDateSchema";

export class GetDefaultDateUseCase {
	execute(value: DefaultDateTypeType) {
		if (value.type === "fixed") {
			return dayjs(value.date).toDate();
		}
		// TODO: value.type === "frontmatter"

		return dayjs().toDate();
	}
}
