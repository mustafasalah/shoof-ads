import tableReducer, { tableInitialState } from "./TableReducer";

const showsTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			genres: { label: "All Genres", value: "" },
			author: { label: "All Authors", value: "" },
			status: { label: "All Status", value: "" },
		},
		search: { name: { label: "show name", value: "" } },
	},
	sortColumn: {
		column: "publishDate",
		order: "desc",
	},
};

const showsTableReducer = (tableName) =>
	tableReducer(tableName, showsTableInitialState);

export default showsTableReducer;
