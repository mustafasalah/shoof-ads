import tableReducer, { tableInitialState } from "./TableReducer";

const pagesTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			status: {
				label: "All Status",
				value: "",
			},
		},
		search: { title: { label: "page title", value: "" } },
	},
	sortColumn: {
		column: "publishDate",
		order: "desc",
	},
};

const pagesTableReducer = tableReducer("pages", pagesTableInitialState);

export default pagesTableReducer;
