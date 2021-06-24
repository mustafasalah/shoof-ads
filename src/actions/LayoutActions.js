import * as ACTIONS from "./ActionTypes";
import getLayout from "./../components/services/layoutServices";
import http from "./../components/services/httpServices";

const layoutActions = {
	loadLayoutData() {
		return {
			type: ACTIONS.LOAD_LAYOUT,
			payload: getLayout(),
		};
	},

	deleteWidget(data) {
		return {
			type: ACTIONS.DELETE_LAYOUT_WIDGET,
			payload: http.delete(`/layout/${data.id}`),
			meta: {
				id: data.id,
				position: data.position,
				formType: "layout",
			},
		};
	},

	updateLayoutWidget(data) {
		return {
			type: ACTIONS.UPDATE_LAYOUT_WIDGET_DATA,
			payload: http.put("/layout", data),
			meta: {
				position: data.position,
			},
		};
	},

	addWidget(position, type, callback) {
		return {
			type: ACTIONS.ADD_WIDGET_TO_LAYOUT,
			payload: http.post("/layout", {
				position,
				type,
			}),
			meta: {
				position,
				widgetType: type,
				formType: "layout",
				callback,
			},
		};
	},

	sortLayout(dropzone, oldIndex, newIndex) {
		return {
			type: ACTIONS.SORT_LAYOUT,
			dropzone,
			oldIndex,
			newIndex,
		};
	},
};

export default layoutActions;
