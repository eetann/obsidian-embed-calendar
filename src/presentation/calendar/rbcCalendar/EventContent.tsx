import type { EventDTO } from "@/usecase/event/eventDTO";
import type { EventProps } from "react-big-calendar";
import { useDnDContext } from "../provider/DnDContextProvider";

export default function EventContent({ event }: EventProps<EventDTO>) {
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
					// 1. onMouseUp
					// 2. setIsDrag(false)
					// 3. "internal-link" makes this back to obsidian internal-link
					// 4. href
					setIsDrag(false);
				}}
			>
				{event.title}
			</a>
		</span>
	);
}
