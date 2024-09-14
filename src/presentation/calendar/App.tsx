import "./app.css";
import { MarkdownRenderChild, type Plugin } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import Calendar from "./Calendar";
import { DnDContextProvider } from "./provider/DnDContextProvider";

// ref: https://github.com/waynevanson/data-entry-obsidian-plugin
export class ReactMarkdownRenderChild extends MarkdownRenderChild {
	plugin: Plugin;
	root: Root;
	source: string;

	constructor(plugin: Plugin, containerEl: HTMLElement, source: string) {
		super(containerEl);
		this.plugin = plugin;
		this.root = createRoot(containerEl);
		this.source = source;
	}

	async onload() {
		this.root.render(
			<StrictMode>
				<div className="ob-embed-calendar">
					<DnDContextProvider>
						<Calendar plugin={this.plugin} source={this.source} />
					</DnDContextProvider>
				</div>
			</StrictMode>,
		);
	}

	async unload() {
		this.root.unmount();
	}
}
