import type { EventDTO } from "@/usecase/event/eventDTO";
import parse from "html-react-parser";
import type { EventProps } from "react-big-calendar";
import { tv } from "tailwind-variants";
import { useDnDContext } from "../provider/DnDContextProvider";

const style = tv({
	base: [
		"text-white no-underline hover:text-white hover:no-underline",
		"block h-full", // To extend the link range to the entire box
	],
	variants: {
		isDrag: { false: "internal-link" },
	},
});

export default function EventContent({ event }: EventProps<EventDTO>) {
	const { isDrag, setIsDrag } = useDnDContext();
	return (
		<>
			<a
				target="_blank"
				rel="noreferrer noopener"
				className={style({ isDrag })}
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
