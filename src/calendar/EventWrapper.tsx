import type { ReactNode } from "react";
import type { Event as RbcEvent } from "react-big-calendar";

type EventWrapperProps = {
	event: RbcEvent;
	children?: ReactNode;
};

export default function EventWrapper({ event, children }: EventWrapperProps) {
	return (
		<a
			target="_blank"
			rel="noreferrer noopener"
			className="internal-link text-white no-underline block"
			data-href={event.resource.link}
			href={event.resource.link}
		>
			{children}
		</a>
	);
}
