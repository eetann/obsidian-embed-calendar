import { DateTime } from "@/domain/model/event/dateTime/dateTime";
import { Event } from "@/domain/model/event/event";
import { Metadata } from "@/domain/model/event/metadata/metadata";
import { Path } from "@/domain/model/event/path/path";
import { Title } from "@/domain/model/event/title/title";
import type { IFileRepository } from "@/domain/model/shared/IFileRepository";
import { EventDTO } from "@/usecase/event/eventDTO";
import dayjs from "dayjs";
import type { OptionsType } from "../getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
export type ChangeDateTimeCommand = {
	event: EventDTO;
	start: string | Date;
	end: string | Date;
	options: OptionsType;
};

export class ChangeDateTimeUseCase {
	constructor(private fileRepository: IFileRepository) {}
	async execute({ event, start, end, options }: ChangeDateTimeCommand) {
		const newEvent = Event.reconstruct(
			new Path(event.path),
			new Title(event.title),
			new DateTime({
				start: dayjs(start).format(event.format),
				end: dayjs(end).format(event.format),
				allDay: event.allDay,
				format: event.format,
			}),
			new Metadata(event.metadata),
		);

		const file = this.fileRepository.find(event.path);
		if (!file) {
			throw new Error(`File not found: ${event.path}`);
		}
		const frontmatter = { [options.startKey]: newEvent.dateTime.startString };
		if (options.endKey) {
			frontmatter[options.endKey] = newEvent.dateTime.endString;
		}
		await this.fileRepository.updateFrontmatter(file, frontmatter);

		return new EventDTO(newEvent);
	}
}
