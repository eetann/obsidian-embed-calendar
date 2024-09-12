import type { EventDTO } from "@/usecase/event/eventDTO";
import type { OptionsType } from "@/usecase/getCodeBlockResultUseCase/codeBlockValidator/optionsValidator";
import { GetCodeBlockResultUseCase } from "@/usecase/getCodeBlockResultUseCase/getCodeBlockResultUseCase";
import { useEffect, useState } from "react";

export function useCodeBlock(source: string) {
	const [options, setOptions] = useState<OptionsType | null>(null);
	const [events, setEvents] = useState<EventDTO[] | null>(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		let ignore = false;
		new GetCodeBlockResultUseCase()
			.execute(source)
			.then((codeblock) => {
				if (!ignore) {
					setOptions(codeblock.options);
					setEvents(codeblock.events);
				}
			})
			.catch((reason) => {
				setError(reason);
			});
		return () => {
			ignore = true;
		};
	}, [source]);

	return { options, events, setEvents, error };
}
