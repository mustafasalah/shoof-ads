import http from "./../components/services/httpServices";
import * as ACTIONS from "./ActionTypes";

export const loadNotifications = () => ({
	type: ACTIONS.LOAD_NOTIFICATIONS,
	payload: http.get("/notifications/"),
});

export const deleteNotification = (id) => ({
	type: ACTIONS.DELETE_NOTIFICATION,
	payload: http.delete(`/notifications/${id}`),
});
