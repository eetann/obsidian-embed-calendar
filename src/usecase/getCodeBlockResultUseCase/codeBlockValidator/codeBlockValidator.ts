import { EventsValidator } from "./eventsValidator";
import { OptionsValidator } from "./optionsValidator";

export class CodeBlockValidator {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	execute(data: any) {
		const options = new OptionsValidator().execute(data.options);
		const events = new EventsValidator(options).execute(data.events);
		return { options, events };
	}
}
