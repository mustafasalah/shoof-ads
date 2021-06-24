import http from "./httpServices";

export default function getViewsData(period) {
	return http.get(`/views/${period}`);
}
