import type { DataviewApi } from "obsidian-dataview/lib/api/plugin-api";
async function runSource(source: string) {
	const script = source;
	// TODO: scriptをエスケープする必要があるのか？
	const func = new Function(
		`return new Promise((s,r)=>{(async ()=>{
      const dv = DataviewAPI;
      return ${script};
      })().then(s).catch(r)})`,
	);
	return await func();
}

type EmbedCalendarExpression = {
	pages: ReturnType<DataviewApi["pages"]>;
	options: {
		test?: boolean;
	};
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isEmbedCalendarExpression(obj: any): obj is EmbedCalendarExpression {
	if (!obj.pages) return false;
	if (!obj.options) return false;
	return true;
}

export async function getValuesFromSource(
	source: string,
): Promise<EmbedCalendarExpression> {
	const value = await runSource(source);
	if (!isEmbedCalendarExpression(value)) {
		throw new Error("could't parse code");
	}
	return value;
}
