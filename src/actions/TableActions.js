import * as ACTIONS from "./ActionTypes";

const getTableActions = (tableName) => ({
	loadTableItems: (items, currentPage) => ({
		type: ACTIONS.TABLE_MOUNT,
		tableName,
		items,
		currentPage,
	}),
	onItemSelect: (itemId, checked) => ({
		type: ACTIONS.TABLE_SELECT_ITEM,
		tableName,
		itemId,
		checked,
	}),
	onItemsSelect: (items, checked) => ({
		type: ACTIONS.TABLE_SELECT_ITEMS,
		tableName,
		items,
		checked,
	}),
	onPageChange: (pageNo) => ({
		type: ACTIONS.TABLE_CHANGE_PAGE,
		tableName,
		pageNo,
	}),
	onItemsPerPageChange: (itemsNo) => ({
		type: ACTIONS.TABLE_CHANGE_ITEM_PER_PAGE,
		tableName,
		itemsNo: Number(itemsNo),
	}),
	onFilter: (filterType, newFilter) => ({
		type: ACTIONS.TABLE_FILTER,
		tableName,
		filterType,
		newFilter,
	}),
	onSort: (sortColumn) => ({
		type: ACTIONS.TABLE_SORT,
		tableName,
		sortColumn,
	}),
	onActionChange: (selectedAction) => ({
		type: ACTIONS.TABLE_ACTION_CHANGE,
		tableName,
		selectedAction,
	}),
	onActionApply: (actions) => ({
		type: ACTIONS.TABLE_ACTION_APPLY,
		tableName,
		actions,
	}),
});

export default getTableActions;
