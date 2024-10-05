import type { EventDTO } from "@/usecase/event/eventDTO";
import parse from "html-react-parser";
import type { EventProps } from "react-big-calendar";
import { tv } from "tailwind-variants";
import { useDnDContext } from "../provider/DnDContextProvider";

const style = tv({
	base: [
		// make it easy to see
		"text-white no-underline hover:text-white hover:no-underline",
		// To extend the link range to the entire box
		"block h-full",
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
					className="p-2 bg-[var(--background-modifier-form-field)]"
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
