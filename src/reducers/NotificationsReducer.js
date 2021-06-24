import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";

const notificationsReducer = (state = [], { type, payload, error }) => {
	switch (type) {
		case ACTIONS.LOAD_NOTIFICATIONS:
			if (error && payload) {
				toast.error(payload.message + " in loading notifications");
				return state;
			}
			return payload.data;

		case ACTIONS.DELETE_NOTIFICATION:
			return state.filter(
				(notification) => notification.id !== payload.data.id
			);

		default:
			return state;
	}
};

export default notificationsReducer;
