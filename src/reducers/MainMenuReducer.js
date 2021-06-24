import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";
import { deepCopy } from "./../js/Utility";

const mainMenuReducer = (
	state = [],
	{ type, error, payload, meta, isUpdate, item }
) => {
	switch (type) {
		case ACTIONS.UPDATE_MENU_ITEMS:
			if (item.nested_in === undefined) {
				if (isUpdate) {
					return [...state].map((menuItem) => {
						if (menuItem.id === item.id) return item;
						return menuItem;
					});
				}
				return [...state, item];
			} else {
				if (isUpdate) {
					return [...state].map((menuItem) => {
						if (menuItem.id === item.nested_in) {
							return {
								...menuItem,
								nested: menuItem.nested.map((nestedItem) => {
									if (nestedItem.id === item.id) return item;
									return nestedItem;
								}),
							};
						}
						return menuItem;
					});
				}

				const newMenu = deepCopy(state);
				const subMenu = newMenu.find(
					(menuItem) => +menuItem.id === item.nested_in
				);

				if (subMenu === undefined) return state;

				// Convert nested_in id to string first
				item.nested_in = item.nested_in.toString();

				subMenu.nested.push(item);

				return newMenu;
			}

		case ACTIONS.DELETE_MAIN_MENU_ITEM:
			if (error && payload) {
				toast.error(payload.message + " when deleting menu item");
				return state;
			}
			const newState = deepCopy(state);
			if (meta.nestedIn !== undefined) {
				const res = newState.map((item) => {
					if (item.id === meta.nestedIn) {
						return {
							...item,
							nested: item.nested.filter(
								(nestedItem) => nestedItem.id !== meta.id
							),
						};
					}
					return item;
				});
				return res;
			}

			// alert success message
			toast.success("The menu item has been deleted successfully");

			return newState.filter((item) => item.id !== meta.id);

		case ACTIONS.MOVE_SUB_MENU_ITEM:
			if (error && payload) {
				toast.error(payload.message + " when moving sub menu item");
			}
			return payload.data;

		case ACTIONS.SORT_MAIN_MENU_ITEMS:
			if (error && payload) {
				toast.error(payload.message + " when sorting main menu");
			}
			return payload.data;

		case ACTIONS.LOAD_MAIN_MENU_STRUCTURE:
			if (error && payload) {
				toast.error(payload.message + " when loading main menu data");
				return state;
			}
			return payload.data;

		default:
			return state;
	}
};

export default mainMenuReducer;
