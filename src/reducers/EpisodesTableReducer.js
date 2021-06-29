import tableReducer, { tableInitialState } from "./TableReducer";

const episodesTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			author: { label: "All Authors", value: "" },
			status: { label: "All Status", value: "" },
		},
		search: { showName: { label: "show name", value: "" } },
	},
	sortColumn: {
		column: "publishDate",
		order: "desc",
	},
};

const episodesTableReducer = tableReducer(
	"episodes",
	episodesTableInitialState
);

export default episodesTableReducer;
