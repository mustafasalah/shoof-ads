import http from "./httpServices";

export default async function auth() {
	return await http.get("/auth");
}
