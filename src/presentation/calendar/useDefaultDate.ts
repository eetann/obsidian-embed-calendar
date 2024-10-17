import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { GetDefaultDateUseCase } from "@/usecase/options/getDefaultDateUseCase";
import type { Plugin } from "obsidian";

interface EmbedCalendarPlugin extends Plugin {
	currentDateDict?: { [x: string]: Date };
}

export function useDefaultDate(
	plugin: EmbedCalendarPlugin,
	options: OptionsType | null,
) {
	if (!options) {
		return { defaultDate: undefined, calendarId: "" };
	}
	let defaultDate = new GetDefaultDateUseCase().execute(
		options.defaultDateType,
	);
	if (!options.idForKeepDate) {
		return { defaultDate, calendarId: crypto.randomUUID() };
	}

	const calendarId = options.idForKeepDate;
	if (!plugin.currentDateDict) {
		plugin.currentDateDict = { [calendarId]: defaultDate };
		return { defaultDate, calendarId };
	}

	if (plugin.currentDateDict[calendarId]) {
		defaultDate = plugin.currentDateDict[calendarId];
	} else {
		plugin.currentDateDict[calendarId] = defaultDate;
	}
	return { defaultDate, calendarId };
}
