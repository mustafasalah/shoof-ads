import tableReducer, { tableInitialState } from "./TableReducer";

const showsTableInitialState = {
    ...tableInitialState,
    filters: {
        select: {
            genres: { label: "All Categories", value: "" },
            author: { label: "All Authors", value: "" },
            status: { label: "All Status", value: "" },
        },
        search: { name: { label: "playlist name", value: "" } },
    },
    sortColumn: {
        column: "publishDate",
        order: "desc",
    },
};

const showsTableReducer = (tableName) =>
    tableReducer(tableName, showsTableInitialState);

export default showsTableReducer;
