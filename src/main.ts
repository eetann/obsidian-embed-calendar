import { Plugin } from "obsidian";
import { EmbedCalendarAPI, type IEmbedCalendarAPI } from "./api";

interface Window {
	renderCalendar?: IEmbedCalendarAPI["renderCalendar"];
}
declare let window: Window;

export default class EmbedCalendar extends Plugin {
	async onload() {
		// Register API to global window object to use in dataviewjs codeblock
		const api = new EmbedCalendarAPI(this).make();
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		(window.renderCalendar = api.renderCalendar) &&
			// biome-ignore lint/performance/noDelete: <explanation>
			this.register(() => delete window.renderCalendar);
	}
}
