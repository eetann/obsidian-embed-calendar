type DefautDateToday = {
	type: "today";
};

type DefautDateFixed = {
	type: "fixed";
	date: string;
};

type DefaultDateFrontmatter = {
	type: "frontmatter";
	key: string;
};

export type Options = {
	defautDate?: DefautDateToday | DefautDateFixed | DefaultDateFrontmatter; // default: today
	// TODO: moreのクリックでpopupかDayか
	// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--popup
};
// TODO: オプションのパース
