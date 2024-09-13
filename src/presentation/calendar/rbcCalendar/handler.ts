import { FileRepository } from "@/infra/obsidian/fileRepository";
import { ChangeDateTimeUseCase } from "@/usecase/event/changeDateTimeUseCase";
import type { EventDTO } from "@/usecase/event/eventDTO";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import type { Plugin } from "obsidian";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";

export class OnEventDrop {
	options: OptionsType;
	changeDateTime: ChangeDateTimeUseCase;
	constructor(plugin: Plugin, options: OptionsType) {
		this.options = options;
		const fileRepository = new FileRepository(plugin);
		this.changeDateTime = new ChangeDateTimeUseCase(fileRepository);
	}

	async execute({ event, start, end }: EventInteractionArgs<EventDTO>) {
		console.log("onEventDrop");
		const eventDTO = await this.changeDateTime.execute({
			event,
			start,
			end,
			options: this.options,
		});
		// TODO: ここでeventsの書き換え
		console.log({ eventDTO });
	}
}
