import type { EventDTO } from "@/usecase/event/eventDTO";
import parse from "html-react-parser";
import type { EventProps } from "react-big-calendar";
import { useDnDContext } from "../provider/DnDContextProvider";

export default function EventContent({ event }: EventProps<EventDTO>) {
	const { isDrag, setIsDrag } = useDnDContext();
	return (
		<>
			<a
				target="_blank"
				rel="noreferrer noopener"
				className={isDrag ? "internal-link" : ""}
				style={{
					// To extend the link range to the entire box
					display: "block",
					height: "100%",
					// make it easy to see
					textDecorationLine: "none",
					color: "white",
				}}
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
			{typeof event.metadata === "string" ? (
				parse(event.metadata)
			) : event.metadata ? (
				<div
					style={{
						padding: "5px",
						backgroundColor: "var(--background-modifier-form-field)",
					}}
					ref={(ref) => ref?.appendChild(event.metadata as Node)}
					onMouseDown={(e) => {
						// prioritize event.metadata over react-big-calendar
						e.stopPropagation();
					}}
				/>
			) : undefined}
		</>
	);
}
