import tableReducer, { tableInitialState } from "./TableReducer";

const reviewsTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			status: {
				label: "All Status",
				value: "",
			},
			rate: {
				label: "All Rates",
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

const reviewsTableReducer = tableReducer("reviews", reviewsTableInitialState);

export default reviewsTableReducer;
