import type { ReactNode } from "react";
import { useDnDContext } from "../provider/DnDContextProvider";
import type { EventDTO } from "@/usecase/event/eventDTO";

type EventWrapperProps = {
	event: EventDTO;
	children?: ReactNode;
};

export default function EventWrapper({ event, children }: EventWrapperProps) {
	const { isDrag } = useDnDContext();
	return (
		<span>
			<a
				target="_blank"
				rel="noreferrer noopener"
				className={
					isDrag ? "text-white no-underline" : "internal-link  no-underline"
				}
				data-href={event.path}
				href={event.path}
			>
				{children}
			</a>
		</span>
	);
}
