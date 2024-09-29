import type { Plugin } from "obsidian";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Calendar from "./presentation/calendar/Calendar";
import { DnDContextProvider } from "./presentation/calendar/provider/DnDContextProvider";

// ref: https://github.com/mdelobelle/metadatamenu/blob/e2190a84124684bd335f567b6d9d6c054e804276/src/MetadataMenuApi.ts
export interface IEmbedCalendarAPI {
	renderCalendar: (
		containerEl: Element,
		rawEvents: unknown,
		rawOptions: unknown,
	) => void;
}

export class EmbedCalendarAPI {
	plugin: Plugin;
	constructor(plugin: Plugin) {
		this.plugin = plugin;
		console.log({ plugin });
	}

	public make(): IEmbedCalendarAPI {
		return {
			renderCalendar: this.renderCalendar(),
		};
	}

	// TODO: この関数が呼ばれていない？
	renderCalendar() {
		return (containerEl: Element, rawEvents: unknown, rawOptions: unknown) => {
			const root = createRoot(containerEl);
			root.render(
				<StrictMode>
					<div className="ob-embed-calendar">
						<DnDContextProvider>
							<Calendar
								plugin={this.plugin}
								rawEvents={rawEvents}
								rawOptions={rawOptions}
							/>
						</DnDContextProvider>
					</div>
				</StrictMode>,
			);
		};
	}
}
