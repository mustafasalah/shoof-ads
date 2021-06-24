import { defaultItemsPerPage } from "../configs.json";
import * as ACTIONS from "../actions/ActionTypes";

export const tableInitialState = {
	itemsPerPage: defaultItemsPerPage,
	selectedAction: "",
	selectedItems: [],
	currentPage: 1,
	filters: {
		select: null,
		search: null,
	},
	sortColumn: "id",
};

const tableReducer = (tableName, initialState) => (
	state = initialState,
	{ type, ...payload }
) => {
	if (tableName !== payload.tableName) return state;

	switch (type) {
		case ACTIONS.TABLE_CHANGE_ITEM_PER_PAGE:
			return {
				...state,
				itemsPerPage: payload.itemsNo,
				currentPage: 1,
				selectedItems: [],
			};

		case ACTIONS.TABLE_SELECT_ITEM:
			const selectedItems = [...state.selectedItems],
				{ itemId, checked } = payload;

			if (checked) {
				selectedItems.push(itemId);
			} else {
				selectedItems.splice(selectedItems.indexOf(itemId), 1);
			}

			return { ...state, selectedItems };

		case ACTIONS.TABLE_SELECT_ITEMS:
			const { items, checked: selected } = payload;
			if (selected) {
				return {
					...state,
					selectedItems: items.map((item) => item.id),
				};
			} else {
				return { ...state, selectedItems: [] };
			}

		case ACTIONS.TABLE_CHANGE_PAGE:
			const { pageNo } = payload;
			return { ...state, currentPage: pageNo, selectedItems: [] };

		case ACTIONS.TABLE_FILTER:
			const { filterType, newFilter } = payload,
				filters = { ...state.filters };
			filters[filterType] = { ...filters[filterType], ...newFilter };
			return { ...state, filters, currentPage: 1, selectedItems: [] };

		case ACTIONS.TABLE_SORT:
			const { sortColumn } = payload;
			return { ...state, sortColumn, selectedItems: [] };

		case ACTIONS.TABLE_ACTION_CHANGE:
			const { selectedAction } = payload;
			return { ...state, selectedAction };

		case ACTIONS.TABLE_ACTION_APPLY:
			const { actions: tableActions } = payload;
			const action = tableActions.find(
				({ value }) => value === state.selectedAction
			);
			action && action.handler();
			return { ...state, selectedAction: "", selectedItems: [] };

		default:
			return state;
	}
};

export default tableReducer;
