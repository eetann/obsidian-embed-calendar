import { FileRepository } from "@/infra/obsidian/fileRepository";
import { ChangeDateTimeUseCase } from "@/usecase/event/changeDateTimeUseCase";
import type { EventDTO } from "@/usecase/event/eventDTO";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import type { Plugin } from "obsidian";
import type { Dispatch, SetStateAction } from "react";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";

export class UpdateEvent {
	options: OptionsType;
	changeDateTime: ChangeDateTimeUseCase;
	setEvents: Dispatch<SetStateAction<EventDTO[] | null>>;
	constructor(
		plugin: Plugin,
		options: OptionsType,
		setEvents: Dispatch<SetStateAction<EventDTO[] | null>>,
	) {
		this.options = options;
		const fileRepository = new FileRepository(plugin, options);
		this.changeDateTime = new ChangeDateTimeUseCase(fileRepository);
		this.setEvents = setEvents;
	}

	async execute({ event, start, end }: EventInteractionArgs<EventDTO>) {
		const eventDTO = await this.changeDateTime.execute({
			event,
			start,
			end,
			options: this.options,
		});
		this.setEvents((events) =>
			events
				? events.map((e) => {
						if (e.path === event.path) {
							return eventDTO;
						}
						return e;
					})
				: null,
		);
	}
}
