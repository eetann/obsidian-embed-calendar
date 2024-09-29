import type { EventDTO } from "../event/eventDTO";
import { EventsValidator } from "./codeBlockValidator/eventsValidator";
import {
	type OptionsType,
	OptionsValidator,
} from "./codeBlockValidator/optionsValidator";

export type CodeBlockResultType = {
	options: OptionsType;
	events: EventDTO[];
};
export class GetCodeBlockResultUseCase {
	async execute(
		rawEvents: unknown,
		rawOptions: unknown,
	): Promise<CodeBlockResultType> {
		const options = new OptionsValidator().execute(rawOptions);
		const events = new EventsValidator(options).execute(rawEvents);
		return { options, events };
	}
}
