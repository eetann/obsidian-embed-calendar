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
					aria-label={messages.previous}
				>
					{messages.previous}
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
					aria-label={messages.next}
				>
					{messages.next}
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
