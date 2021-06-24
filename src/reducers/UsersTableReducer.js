import tableReducer, { tableInitialState } from "./TableReducer";

const usersTableInitialState = {
	...tableInitialState,
	filters: {
		select: {
			status: {
				label: "All Status",
				value: "",
			},
			role: {
				label: "All Roles",
				value: "",
			},
		},
		search: { username: { label: "user name", value: "" } },
	},
	sortColumn: {
		column: "id",
		order: "desc",
	},
};

const usersTableReducer = tableReducer("users", usersTableInitialState);

export default usersTableReducer;
