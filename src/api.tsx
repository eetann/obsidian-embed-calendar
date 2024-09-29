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
	}

	public make(): IEmbedCalendarAPI {
		return {
			renderCalendar: this.renderCalendar(),
		};
	}

	renderCalendar() {
		return (containerEl: Element, rawEvents: unknown, rawOptions: unknown) => {
			// As it is executed multiple times by dataview, the following warning is displayed.
			// createRoot() on a container that has already been passed to createRoot() before...
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
