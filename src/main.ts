import { type App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { ReactMarkdownRenderChild } from "./presentation/calendar/App";

interface EmbedCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EmbedCalendarSettings = {
	mySetting: "default",
};

export default class EmbedCalendar extends Plugin {
	settings: EmbedCalendarSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			"embed-calendar",
			async (source, element, context) => {
				const container = element.createEl("div");
				const renderer = new ReactMarkdownRenderChild(container, source);
				context.addChild(renderer);
			},
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EmbedCalendarSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
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
