import { createRoot, type Root } from "react-dom/client";
import { MarkdownRenderChild } from "obsidian";

export class ReactRenderer extends MarkdownRenderChild {
	containerEl: HTMLElement;
	root: Root;
	public constructor(containerEl: HTMLElement) {
		super(containerEl);
		this.containerEl = containerEl;
	}

	async onload() {
		if (!this.root) {
			this.root = createRoot(this.containerEl);
		}
		this.root.render(<div>React Component Here</div>);
	}

	public onunload(): void {
		this.root?.unmount();
	}
}
