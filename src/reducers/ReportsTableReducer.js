import tableReducer, { tableInitialState } from "./TableReducer";

const reportsTableInitialState = {
	...tableInitialState,
	filters: {
		select: {},
		search: { showName: { label: "show name", value: "" } },
	},
	sortColumn: {
		column: "date",
		order: "desc",
	},
};

const reportsTableReducer = tableReducer("reports", reportsTableInitialState);

export default reportsTableReducer;
