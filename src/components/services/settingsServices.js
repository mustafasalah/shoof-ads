import http from "./httpServices";

export const getAvailableLangs = async () => {
	const response = await http.get("/settings/langs");
	return response.data;
};

export default async function getSettings() {
	const response = await http.get("/settings");
	return response.data;
}
