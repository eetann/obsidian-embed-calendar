import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";

// ref: src/calendar/overwrite.css

function setProperty(calendarId: string, name: string, value: string) {
	document
		.getElementById(calendarId)
		?.style.setProperty(`--rbc-event-row-${name}`, value);
}

function applyOneLine(calendarId: string) {
	setProperty(calendarId, "display", "block");
	setProperty(calendarId, "overflow", "hidden");
	setProperty(calendarId, "text-overflow", "ellipsis");
	setProperty(calendarId, "white-space", "nowrap");
	setProperty(calendarId, "-webkit-box-orient", "horizontal");
	setProperty(calendarId, "-webkit-line-clamp", "none");
}

function applyAuto(calendarId: string, rowNumber: number) {
	setProperty(calendarId, "display", "-webkit-box");
	setProperty(calendarId, "overflow", "hidden");
	setProperty(calendarId, "text-overflow", "ellipsis");
	setProperty(calendarId, "white-space", "normal");
	setProperty(calendarId, "-webkit-box-orient", "vertical");
	setProperty(calendarId, "-webkit-line-clamp", rowNumber.toString());
}

function applyManual(calendarId: string) {
	setProperty(calendarId, "display", "-webkit-box");
	setProperty(calendarId, "overflow", "hidden");
	setProperty(calendarId, "text-overflow", "ellipsis");
	setProperty(calendarId, "white-space", "pre-line");
	setProperty(calendarId, "-webkit-box-orient", "vertical");
	setProperty(calendarId, "-webkit-line-clamp", "none");
}

export function applyRowTypeStyle(
	calendarId: string,
	rowType: OptionsType["eventRowType"],
) {
	switch (rowType.type) {
		case "auto":
			applyAuto(calendarId, rowType.rowNumber);
			break;
		case "manual":
			applyManual(calendarId);
			break;
		default:
			applyOneLine(calendarId);
	}
}
