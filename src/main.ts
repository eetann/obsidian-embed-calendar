import { Plugin } from "obsidian";
import { EmbedCalendarAPI, type IEmbedCalendarAPI } from "./api";

interface Window {
	renderCalendar?: IEmbedCalendarAPI["renderCalendar"];
}
declare let window: Window;

type CurrentDateDict = {
	[x: string]: Date;
};

export default class EmbedCalendar extends Plugin {
	public currentDateDict: CurrentDateDict;

	async onload() {
		this.currentDateDict = {};
		// Register API to global window object to use in dataviewjs codeblock
		const api = new EmbedCalendarAPI(this).make();
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		(window.renderCalendar = api.renderCalendar) &&
			// biome-ignore lint/performance/noDelete: <explanation>
			this.register(() => delete window.renderCalendar);
		this.addCommandRefreshCurrentDate();
	}

	addCommandRefreshCurrentDate() {
		this.addCommand({
			id: "refresh-current-date",
			name: "Refresh current date",
			callback: () => {
				this.currentDateDict = {};
				// biome-ignore lint/suspicious/noExplicitAny: ???
				(this.app as any).commands.executeCommandById(
					"dataview:dataview-rebuild-current-view",
				);
			},
		});
	}
}
