import * as ACTIONS from "./ActionTypes";
import http from "./../components/services/httpServices";

const SchedulerActions = {
	onSchedulerLoad(callback) {
		return {
			type: ACTIONS.SCHEDULER_LOAD_DATA,
			payload: http.get("/scheduler"),
			meta: {
				callback,
			},
		};
	},

	onShowAdded(showId, day, time) {
		return {
			type: ACTIONS.SCHEDULER_ADD_SHOW,
			payload: http.post("/scheduler", {
				showId,
				day,
				time,
			}),
		};
	},

	onFieldUpdate(fieldType, data) {
		return {
			type: ACTIONS.SCHEDULER_UPDATE_FIELD,
			fieldType,
			data,
		};
	},

	onShowUpdated(id, day, time) {
		return {
			type: ACTIONS.SCHEDULER_UPDATED_SHOW,
			payload: http.put(`/scheduler/${id}`, {
				day,
				time,
			}),
		};
	},

	onShowUpdate(id) {
		return {
			type: ACTIONS.SCHEDULER_UPDATE_SHOW,
			id: Number(id),
		};
	},

	onShowDeleted(id) {
		return {
			type: ACTIONS.SCHEDULER_DELETE_SHOW,
			payload: http.delete(`/scheduler/${id}`),
		};
	},
};

export default SchedulerActions;
