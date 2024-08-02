import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import prefixSelector from "postcss-prefix-selector";

/** @type {import("postcss").Plugin} */
function transformSelector(prefix, selector, prefixedSelector) {
	if (selector.includes(".theme-dark")) {
		return selector.replace(".theme-dark", `.theme-dark ${prefix}`);
	}

	// daisyUI: src/base/colors.css
	if (selector.match(/:root/)) {
		return selector.replace(/:root/, prefix);
	}
	// daisyUI: src/base/general.css
	if (selector.match(/html/)) {
		return selector.replace(/html/, prefix);
	}

	return prefixedSelector;
}

export default {
	plugins: [
		tailwindcss({ config: "./tailwind.config.js" }),
		autoprefixer({}),
		prefixSelector({
			prefix: ".ob-embed-calendar",
			transform: transformSelector,
		}),
	],
};
