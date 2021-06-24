import http from "./httpServices";

export default async function getUsers(id) {
	const users = await http.get(`/users/${id || ""}`);
	return users.data;
}
