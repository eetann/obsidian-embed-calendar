import { ValidCodeBlockEventsAS } from "./validCodeBlockEventsAS";
import { ValidCodeBlockOptionsAS } from "./validCodeBlockOptionsAS";

export class ValidCodeBlockAS {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	execute(data: any) {
		const options = new ValidCodeBlockOptionsAS().execute(data.options);
		const events = new ValidCodeBlockEventsAS(options).execute(data.events);
		return { options, events };
	}
}
