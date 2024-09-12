import "./app.css";
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import Calendar from "./Calendar";

// ref: https://github.com/waynevanson/data-entry-obsidian-plugin
export class ReactMarkdownRenderChild extends MarkdownRenderChild {
	root: Root;
	source: string;

	constructor(containerEl: HTMLElement, source: string) {
		super(containerEl);
		this.root = createRoot(containerEl);
		this.source = source;
	}

	async onload() {
		this.root.render(
			<StrictMode>
				<div className="ob-embed-calendar">
					<Calendar source={this.source} />
				</div>
			</StrictMode>,
		);
	}

	async unload() {
		this.root.unmount();
	}
}
