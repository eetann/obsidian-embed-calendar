import "./app.css";
import { GetCodeBlockResultUseCase } from "@/usecase/getCodeBlockResultUseCase/getCodeBlockResultUseCase";
import { MarkdownRenderChild } from "obsidian";
import { StrictMode } from "react";
import { type Root, createRoot } from "react-dom/client";
import CalendarWrapper from "./CalendarWrapper";
import RbcCalendar from "./rbcCalendar/RbcCalendar";

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
		try {
			const { options, events } = await new GetCodeBlockResultUseCase().execute(
				this.source,
			);
			this.root.render(
				<StrictMode>
					<div className="ob-embed-calendar">
						<CalendarWrapper options={options}>
							<RbcCalendar events={events} options={options} />
						</CalendarWrapper>
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
