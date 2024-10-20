import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigate, type ToolbarProps, type View } from "react-big-calendar";

interface MyToolbarProps extends ToolbarProps {
	defaultDate: Date | undefined;
}

export function Toolbar({
	label,
	localizer: { messages },
	onNavigate,
	onView,
	view,
	views,
	defaultDate,
}: MyToolbarProps) {
	return (
		<div className="rbc-toolbar">
			<span className="rbc-btn-group">
				<button
					type="button"
					onClick={() => onNavigate(Navigate.PREVIOUS)}
					className="!px-1"
					aria-label={messages.previous}
				>
					<ChevronLeft />
				</button>
				<button
					type="button"
					onClick={() => onNavigate(Navigate.TODAY)}
					aria-label={messages.today}
				>
					{messages.today}
				</button>
				<button
					type="button"
					onClick={() => onNavigate(Navigate.DATE, defaultDate)}
					aria-label="Default"
				>
					Default
				</button>
				<button
					type="button"
					onClick={() => onNavigate(Navigate.NEXT)}
					className="!px-1"
					aria-label={messages.next}
				>
					<ChevronRight />
				</button>
			</span>
			<span className="rbc-toolbar-label">{label}</span>
			<span className="rbc-btn-group">
				{(views as View[])?.map((name: View) => (
					<button
						type="button"
						key={name}
						className={view === name ? "rbc-active" : ""}
						onClick={() => onView(name)}
					>
						{messages[name]}
					</button>
				))}
			</span>
		</div>
	);
}
