import { FileRepository } from "@/infra/obsidian/fileRepository";
import { CreateEventUseCase } from "@/usecase/event/createEventUseCase";
import type { EventDTO } from "@/usecase/event/eventDTO";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import type { Plugin } from "obsidian";
import type { Dispatch, SetStateAction } from "react";
import type { SlotInfo } from "react-big-calendar";

export class CreateEvent {
	private options: OptionsType;
	private createEventUseCase: CreateEventUseCase;
	private setEvents: Dispatch<SetStateAction<EventDTO[] | null>>;
	constructor(
		plugin: Plugin,
		options: OptionsType,
		setEvents: Dispatch<SetStateAction<EventDTO[] | null>>,
	) {
		this.options = options;
		this.createEventUseCase = new CreateEventUseCase(
			new FileRepository(plugin, options),
		);
		this.setEvents = setEvents;
	}

	async execute({ start, end }: SlotInfo) {
		const eventDTO = await this.createEventUseCase.execute({
			start,
			end,
			options: this.options,
		});
		this.setEvents((events) => (events ? [...events, eventDTO] : [eventDTO]));
	}
}
