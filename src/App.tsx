import "react-big-calendar/lib/css/react-big-calendar.css";
import "./main.css";
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import Calendar from "./calendar/Calendar";
import { getValuesFromSource } from "./expression";

// https://github.com/waynevanson/data-entry-obsidian-plugin
export class ReactMarkdownRenderChild extends MarkdownRenderChild {
	root: Root;
	source: string;

	constructor(containerEl: HTMLElement, source: string) {
		super(containerEl);
		this.root = createRoot(containerEl);
		this.source = source;
	}

	async onload() {
		try {
			const expression = await getValuesFromSource(this.source);
			this.root.render(
				<StrictMode>
					<div className="ob-embed-calendar">
						<Calendar pages={expression.pages} />
					</div>
				</StrictMode>,
			);
		} catch (e) {
			console.log(e);
			// TODO: エラー用の表示を追加する
		}
	}

	async unload() {
		this.root.unmount();
	}
}
