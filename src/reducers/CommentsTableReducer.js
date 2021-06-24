import tableReducer, { tableInitialState } from "./TableReducer";

const commentsTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			status: {
				label: "All Status",
				value: "",
			},
		},
		search: { showName: { label: "show name", value: "" } },
	},
	sortColumn: {
		column: "publishDate",
		order: "desc",
	},
};

const commentsTableReducer = tableReducer(
	"comments",
	commentsTableInitialState
);

export default commentsTableReducer;
