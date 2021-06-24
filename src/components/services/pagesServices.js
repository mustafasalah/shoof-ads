import http from "./httpServices";

export default async function getPages(id) {
	const pages = await http.get(`/pages/${id || ""}`);
	return pages.data;
}
