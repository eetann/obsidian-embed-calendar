import { DateTime } from "@/domain/model/event/dateTime/dateTime";
import { Event } from "@/domain/model/event/event";
import { Metadata } from "@/domain/model/event/metadata/metadata";
import { Path } from "@/domain/model/event/path/path";
import { Title } from "@/domain/model/event/title/title";
import { MockFileRepository } from "@/infra/obsidian/mockFileRepository";
import { ChangeDateTimeUseCase } from "./changeDateTimeUseCase";
import { EventDTO } from "./eventDTO";

describe("ChangeDateTimeUseCase", () => {
	const fileRepository = new MockFileRepository();
	const changeDateTime = new ChangeDateTimeUseCase(fileRepository);
	const event = Event.reconstruct(
		new Path("inbox/test.md"),
		new Title("title"),
		new DateTime({
			start: "2024-09-01",
			end: "2024-09-02",
			allDay: true,
			format: "YYYY-MM-DD",
		}),
		new Metadata(undefined),
	);
	const eventDTO = new EventDTO(event);
	const options = {
		dateFormat: "YYYY-MM-DD",
		startKey: "start",
		newNoteFolder: "inbox",
		newNoteNameType: { type: "date", format: "YYYYMMDDHHmmss" },
		newNoteMethodType: { type: "scratch" },
		defaultDateType: { type: "today" },
		defaultView: "month",
		calendarHeight: 500,
		eventFontSize: "xs",
		eventRowType: { type: "oneLine" },
		language: "en",
	} as const;

	it("DTO with changed dates is returned", async () => {
		const newEventDTO = await changeDateTime.execute({
			event: eventDTO,
			start: new Date("2024-09-02"),
			end: new Date("2024-09-03"),
			options,
		});
		expect(newEventDTO.startString).toBe("2024-09-02");
		expect(newEventDTO.endString).toBe("2024-09-03");
	});

	it("Error if date is wrong", async () => {
		await expect(
			changeDateTime.execute({
				event: eventDTO,
				start: new Date("2024-09-02"),
				end: new Date("2024-09-01"),
				options,
			}),
		).rejects.toThrow("start should be past end");
	});
});
