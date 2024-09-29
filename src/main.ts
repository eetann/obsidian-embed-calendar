import { type App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { EmbedCalendarAPI, type IEmbedCalendarAPI } from "./api";

interface Window {
	renderCalendar?: IEmbedCalendarAPI["renderCalendar"];
}
declare let window: Window;

interface EmbedCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EmbedCalendarSettings = {
	mySetting: "default",
};

export default class EmbedCalendar extends Plugin {
	private _language = "embed-calendar";
	settings: EmbedCalendarSettings;

	async onload() {
		await this.loadSettings();
		// TODO: ここで定義したAPIをdataviewjs内で使えるようにする
		// Register API to global window object.
		const api = new EmbedCalendarAPI(this).make();
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		(window.renderCalendar = api.renderCalendar) &&
			// biome-ignore lint/performance/noDelete: <explanation>
			this.register(() => delete window.renderCalendar);

		// this.registerMarkdownCodeBlockProcessor(
		// 	this._language,
		// 	async (source, element, context) => {
		// 		const container = element.createEl("div");
		// 		const renderer = new ReactMarkdownRenderChild(this, container, source);
		// 		context.addChild(renderer);
		// 	},
		// );
		// this.registerCodeBlockHighlithing();
		// this.register(() => this.unregisterCodeBlockHighlithing());

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EmbedCalendarSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// registerCodeBlockHighlithing() {
	// 	window.CodeMirror.defineMode(this._language, (config) =>
	// 		window.CodeMirror.getMode(config, "javascript"),
	// 	);
	// }
	// unregisterCodeBlockHighlithing() {
	// 	window.CodeMirror.defineMode(this._language, (config) =>
	// 		window.CodeMirror.getMode(config, "null"),
	// 	);
	// }
}

class EmbedCalendarSettingTab extends PluginSettingTab {
	plugin: EmbedCalendar;

	constructor(app: App, plugin: EmbedCalendar) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
