import { DateTime } from "@/domain/model/event/dateTime/dateTime";
import { Event } from "@/domain/model/event/event";
import { Metadata } from "@/domain/model/event/metadata/metadata";
import { Path } from "@/domain/model/event/path/path";
import { Title } from "@/domain/model/event/title/title";
import type { IFileRepository } from "@/domain/model/shared/IFileRepository";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import type { OptionsType } from "../getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { EventDTO } from "./eventDTO";
dayjs.extend(localizedFormat);

type CreateEventCommand = {
	start: string | Date;
	end: string | Date;
	options: OptionsType;
};

export class CreateEventUseCase {
	constructor(private fileRepository: IFileRepository) {}

	async execute({ start, end, options }: CreateEventCommand) {
		dayjs.locale(options.language);
		let fileName = "untitled";
		if (options.newNoteNameType.type === "date") {
			fileName = dayjs().format(options.newNoteNameType.format);
		} else if (options.newNoteNameType.type === "modal") {
			// TODO: ここでモーダルを使って入力を受け取る
			fileName = "test";
		} else {
			throw new Error("unexpected newNotePathType");
		}
		const newPath = `${options.newNoteFolder}/${fileName}.md`;
		const event = Event.create(
			new Path(newPath),
			new Title(fileName),
			new DateTime({
				start: dayjs(start).format(options.dateFormat),
				end: dayjs(end).format(options.dateFormat),
				allDay: false,
				format: options.dateFormat,
			}),
			new Metadata(undefined),
		);

		await this.fileRepository.create(event);

		return new EventDTO(event);
	}
}
