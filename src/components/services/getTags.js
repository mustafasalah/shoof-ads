import http from "./httpServices";

export default async function getTags() {
	return await http.get("/shows/tags");
}
