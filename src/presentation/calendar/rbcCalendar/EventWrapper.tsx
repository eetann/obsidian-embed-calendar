import type { ReactNode } from "react";
import type { Event as RbcEvent } from "react-big-calendar";
import { useDnDContext } from "../provider/DnDContextProvider";

type EventWrapperProps = {
	event: RbcEvent;
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
				data-href={event.resource.link}
				href={event.resource.link}
			>
				{children}
			</a>
		</span>
	);
}
