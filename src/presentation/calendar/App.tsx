import "./app.css";
import type { Plugin } from "obsidian";
import { StrictMode } from "react";
import Calendar from "./Calendar";
import { DnDContextProvider } from "./provider/DnDContextProvider";

type Props = {
	plugin: Plugin;
	rawEvents: unknown;
	rawOptions: unknown;
};

export default function App({ plugin, rawEvents, rawOptions }: Props) {
	return (
		<StrictMode>
			<div className="ob-embed-calendar">
				<DnDContextProvider>
					<Calendar
						plugin={plugin}
						rawEvents={rawEvents}
						rawOptions={rawOptions}
					/>
				</DnDContextProvider>
			</div>
		</StrictMode>
	);
}
