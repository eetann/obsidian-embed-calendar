import type { EventDTO } from "@/usecase/event/eventDTO";
import type { ReactNode } from "react";
import type { EventWrapperProps as RbcEventWrapperProps } from "react-big-calendar";
import { useDnDContext } from "../provider/DnDContextProvider";

export interface EventWrapperProps extends RbcEventWrapperProps<EventDTO> {
	children: ReactNode;
}

export default function EventWrapper({ event, children }: EventWrapperProps) {
	const { isDrag, setIsDrag } = useDnDContext();
	return (
		<span>
			<a
				target="_blank"
				rel="noreferrer noopener"
				className={
					isDrag
						? "text-white no-underline"
						: "font-extrabold internal-link  no-underline"
				}
				data-href={event.path}
				href={event.path}
				onMouseUp={() => {
					console.log("onMouseUp");
					setIsDrag(false);
				}}
			>
				{children}
			</a>
		</span>
	);
}
