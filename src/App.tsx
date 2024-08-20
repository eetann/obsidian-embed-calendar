import "./main.css";
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import Calendar from "./calendar/Calendar";
import { parseSource } from "./parseSource";
import { DnDContextProvider } from "./calendar/context";

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
			const { events, options } = await parseSource(this.source);
			this.root.render(
				<StrictMode>
					<div className="ob-embed-calendar">
						<DnDContextProvider>
							<Calendar events={events} options={options} />
						</DnDContextProvider>
					</div>
				</StrictMode>,
			);
		} catch (e) {
			console.log(e);
			this.root.render(
				<StrictMode>
					<div className="ob-embed-calendar">
						<pre>{String(e)}</pre>
					</div>
				</StrictMode>,
			);
		}
	}

	async unload() {
		this.root.unmount();
	}
}
