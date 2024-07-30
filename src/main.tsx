import "react-big-calendar/lib/css/react-big-calendar.css";
import { type App, Plugin, PluginSettingTab, Setting } from "obsidian";
import React, { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import Calendar from "./calendar/Calendar";

interface EmbedCalendarSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: EmbedCalendarSettings = {
	mySetting: "default",
};

export default class EmbedCalendar extends Plugin {
	settings: EmbedCalendarSettings;
	root: Root;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("aaa", (code, el, ctx) => {
			this.root = createRoot(el);
			this.root.render(
				<StrictMode>
					<Calendar />
				</StrictMode>,
			);
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EmbedCalendarSettingTab(this.app, this));
	}

	onunload() {
		this.root?.unmount();
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
