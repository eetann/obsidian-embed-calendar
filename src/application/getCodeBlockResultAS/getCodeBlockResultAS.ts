import { LoadCodeBlockAS } from "./loadCodeBlockAS/loadCodeBlockAS";
import { ValidCodeBlockAS } from "./validCodeBlockAS/validCodeBlockAS";

export class GetCodeBlockResultAS {
	async execute(source: string) {
		const codeBlock = await new LoadCodeBlockAS().execute(source);
		return new ValidCodeBlockAS().execute(codeBlock);
	}
}
