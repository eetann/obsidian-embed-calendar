import dayjs from "dayjs";
import { type ReactNode, useEffect } from "react";
import "./overwrite.css";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { DnDContextProvider } from "./provider/DnDContextProvider";
import { applyRowTypeStyle } from "./rbcCalendar/applyRowTypeStyle";

type Props = {
	options: OptionsType;
	children: ReactNode;
};

export default function Calendar({ options, children }: Props) {
	// To set CSS variables for each Calendar
	const calendarId = crypto.randomUUID();

	const defaultDateType = options.defaultDate.type;
	let defaultDate = dayjs().toDate();
	if (defaultDateType === "fixed") {
		defaultDate = dayjs(options.defaultDate.date).toDate();
	} else if (defaultDateType === "frontmatter") {
		// TODO: frontmatterと紐づけ
	}
	useEffect(() => {
		applyRowTypeStyle(calendarId, options.eventRowType);
	}, [options, calendarId]);

	return (
		<div
			id={calendarId}
			className="bg-[var(--background-primary)] overflow-scroll"
			style={{
				height: `${options.calendarHeight}px`,
			}}
		>
			<DnDContextProvider>{children}</DnDContextProvider>
		</div>
	);
}
