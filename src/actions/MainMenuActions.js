import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import getMenuStructure from "../components/services/mainMenuServices";
import {
	deleteMenuItem,
	sortMenu,
	moveItem,
} from "./../components/services/mainMenuServices";
import { submitMenuItem } from "../components/services/mainMenuServices";
import { menuSchema } from "./ValidationSchema";
import { subMenuSchema } from "./ValidationSchema";
import { toast } from "react-toastify";
import store from "./../store";

const getMenuType = ({ nested_in }) => {
	return nested_in === undefined ? "mainmenu" : "submenu";
};

const mainMenuActions = {
	reflectMenuChanges(item, isUpdate) {
		return {
			type: ACTIONS.UPDATE_MENU_ITEMS,
			item,
			isUpdate,
		};
	},

	submitMenuItem: async (item) => {
		const isNested = item.nested_in !== undefined;
		const { value, error } = joi
			.object(isNested ? subMenuSchema : menuSchema)
			.validate(item);
		const isUpdate = item.id !== "";

		if (!error) {
			try {
				// Send submit request to server
				const { data } = await submitMenuItem(value);

				// alert success message
				if (isUpdate) {
					toast.success(
						"The menu item has been updated successfully"
					);
				} else {
					toast.success(
						"The new menu item has been added successfully"
					);
				}

				// reflect menu items changes in main menu structure
				store.dispatch(
					mainMenuActions.reflectMenuChanges(data, isUpdate)
				);

				return {
					type: ACTIONS.SUBMIT_FORM,
					error: null,
					formType: getMenuType(item),
					donotResetFields: isNested ? ["nested_in"] : [],
				};
			} catch (ex) {
				// alert the network error
				toast.error(ex.message);

				return {
					type: ACTIONS.SUBMIT_FORM,
					error: ex,
					formType: getMenuType(item),
					donotResetFields: ["nested_in"],
				};
			}
		} else {
			// alert the validation error
			toast.error(error.message);

			return {
				type: ACTIONS.SUBMIT_FORM,
				error,
				formType: getMenuType(item),
				donotResetFields: ["nested_in"],
			};
		}
	},

	editMenuItem(item) {
		return {
			type: ACTIONS.EDIT_MAIN_MENU_ITEM,
			item,
			formType: "mainmenu",
		};
	},

	editSubMenuItem(item) {
		return {
			type: ACTIONS.EDIT_SUB_MENU_ITEM,
			item,
			formType: "submenu",
		};
	},

	editSubMenu(id) {
		return {
			type: ACTIONS.EDIT_SUB_MENU,
			formType: "submenu",
			id,
		};
	},

	deleteMenuItem(id, nestedIn) {
		return {
			type: ACTIONS.DELETE_MAIN_MENU_ITEM,
			payload: deleteMenuItem(id),
			meta: { id, nestedIn },
		};
	},

	loadMenuData() {
		return {
			type: ACTIONS.LOAD_MAIN_MENU_STRUCTURE,
			payload: getMenuStructure(),
		};
	},

	moveSubMenuItem(index, nestedIn, direction) {
		return {
			type: ACTIONS.MOVE_SUB_MENU_ITEM,
			payload: moveItem(index, nestedIn, direction),
		};
	},

	sortMenuItems(nestedIn, oldIndex, newIndex) {
		return {
			type: ACTIONS.SORT_MAIN_MENU_ITEMS,
			payload: sortMenu(nestedIn, oldIndex, newIndex),
		};
	},
};

export default mainMenuActions;
