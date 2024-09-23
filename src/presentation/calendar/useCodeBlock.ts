import type { EventDTO } from "@/usecase/event/eventDTO";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { GetCodeBlockResultUseCase } from "@/usecase/getCodeBlockResultUseCase/getCodeBlockResultUseCase";
import type { Plugin } from "obsidian";
import { type DataviewApi, getAPI } from "obsidian-dataview";
import { useEffect, useState } from "react";

declare module "obsidian" {
	interface MetadataCache {
		on(
			name: "dataview:index-ready",
			callback: (api: DataviewApi) => unknown,
			ctx?: unknown,
		): EventRef;
	}
}

export function useCodeBlock(plugin: Plugin, source: string) {
	const [options, setOptions] = useState<OptionsType | null>(null);
	const [events, setEvents] = useState<EventDTO[] | null>(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		const getCodeBlockResult = () => {
			new GetCodeBlockResultUseCase()
				.execute(source)
				.then((codeblock) => {
					if (!ignore) {
						setOptions(codeblock.options);
						setEvents(codeblock.events);
					}
				})
				.catch((reason) => {
					setError(reason);
				});
		};
		plugin.registerEvent(
			plugin.app.metadataCache.on("dataview:index-ready", () => {
				getCodeBlockResult();
			}),
		);
		const api = getAPI();
		if (api.index.initialized) {
			getCodeBlockResult();
		}
		return () => {
			ignore = true;
		};
	}, [source, plugin]);

	return { options, events, setEvents, error };
}
