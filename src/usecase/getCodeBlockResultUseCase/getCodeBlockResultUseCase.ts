import { CodeBlockLoader } from "./codeBlockLoader/codeBlockLoader";
import { CodeBlockValidator } from "./codeBlockValidator/codeBlockValidator";

export class GetCodeBlockResultUseCase {
	async execute(source: string) {
		const codeBlock = await new CodeBlockLoader().execute(source);
		return new CodeBlockValidator().execute(codeBlock);
	}
}
