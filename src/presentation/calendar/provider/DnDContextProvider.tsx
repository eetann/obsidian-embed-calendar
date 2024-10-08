import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type DnDContextType = {
	isDrag: boolean;
	setIsDrag: Dispatch<SetStateAction<boolean>>;
};

const DnDContext = createContext<DnDContextType>({} as DnDContextType);

type Props = {
	children: ReactNode;
};

export function DnDContextProvider({ children }: Props) {
	const [isDrag, setIsDrag] = useState(false);
	const value = { isDrag, setIsDrag };
	return <DnDContext.Provider value={value}>{children}</DnDContext.Provider>;
}

export function useDnDContext(): DnDContextType {
	return useContext<DnDContextType>(DnDContext);
}
