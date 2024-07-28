import {
	type App,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { ReactRenderer } from "./render";

// Remember to rename these classes and interfaces!

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

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon(
			"dice",
			"Calendar Plugin",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				new Notice("THIS is a notice!");
			},
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new EmbedCalendarModal(this.app).open();
			},
		});

		this.registerMarkdownCodeBlockProcessor("aaa", (code, el, ctx) => {
			ctx.addChild(new ReactRenderer(el));
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EmbedCalendarSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class EmbedCalendarModal extends Modal {
	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
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
