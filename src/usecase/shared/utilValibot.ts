import * as v from "valibot";

export function getMessages<TSchema extends v.GenericSchema>(
	issues: [v.InferIssue<TSchema>, ...v.InferIssue<TSchema>[]],
) {
	const messages = [];
	for (const [key, value] of Object.entries(v.flatten(issues).nested ?? {})) {
		if (value) {
			messages.push(`${key}: ${value.join("\n")}`);
		}
	}
	return messages.join("\n");
}
