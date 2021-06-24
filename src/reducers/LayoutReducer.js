import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";

const layoutReducer = (layoutType) => (
	state = [],
	{ type, payload, error, dropzone, oldIndex, newIndex, meta }
) => {
	switch (type) {
		case ACTIONS.DELETE_LAYOUT_WIDGET:
			if (meta.position !== layoutType) return state;

			if (error && payload) {
				toast.error(payload.message + " when deleting the widget");
				return state;
			}

			// alert success message
			toast.success(`The widget has been deleted successfully!`);

			return state.filter((widget) => widget.id !== meta.id);

		case ACTIONS.ADD_WIDGET_TO_LAYOUT:
			const { position, widgetType } = meta;
			if (position !== layoutType) return state;

			if (error && payload) {
				toast.error(
					payload.message + " when adding new widget to layout"
				);
				return state;
			}

			// alert success message
			toast.success(
				`New ${widgetType} widget has been added to ${position} section successfully!`
			);

			return [...state, payload.data];

		case ACTIONS.UPDATE_LAYOUT_WIDGET_DATA:
			if (meta.position !== layoutType) return state;

			if (error && payload) {
				toast.error(
					payload.message + " when updating layout widget data"
				);
				return state;
			}

			// alert success message
			toast.success(`The widget data has been successfully updated!`);

			return state.map((widget) => {
				if (widget.id === payload.data.id) return payload.data;
				return widget;
			});

		case ACTIONS.LOAD_LAYOUT:
			if (error && payload) {
				toast.error(payload.message + " when loading site layout data");
				return state;
			}

			return payload.data[layoutType];

		case ACTIONS.SORT_LAYOUT:
			if (dropzone !== layoutType) return state;
			// copy old state
			const newState = [...state];

			// swap old layout items
			const temp = newState[oldIndex];
			newState[oldIndex] = newState[newIndex];
			newState[newIndex] = temp;
			return newState;

		default:
			return state;
	}
};

export default layoutReducer;
