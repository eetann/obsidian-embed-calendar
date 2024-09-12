import type { EventDTO } from "../event/eventDTO";
import { CodeBlockLoader } from "./codeBlockLoader/codeBlockLoader";
import { CodeBlockValidator } from "./codeBlockValidator/codeBlockValidator";
import type { OptionsType } from "./codeBlockValidator/optionsValidator";

export type CodeBlockResultType = {
	options: OptionsType;
	events: EventDTO[];
};
export class GetCodeBlockResultUseCase {
	async execute(source: string): Promise<CodeBlockResultType> {
		const codeBlock = await new CodeBlockLoader().execute(source);
		return new CodeBlockValidator().execute(codeBlock);
	}
}
