import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.css";
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import Calendar from "./calendar/Calendar";

// https://github.com/waynevanson/data-entry-obsidian-plugin
export class ReactMarkdownRenderChild extends MarkdownRenderChild {
	root: Root;

	constructor(containerEl: HTMLElement) {
		super(containerEl);
		this.root = createRoot(containerEl);
	}

	async onload() {
		this.root.render(
			<StrictMode>
				<div className="ob-embed-calendar">
					<Calendar />
				</div>
			</StrictMode>,
		);
	}

	async unload() {
		this.root.unmount();
	}
}
