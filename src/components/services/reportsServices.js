import http from "./httpServices";

export default async function getReports() {
	const reports = await http.get(`/reports/`);
	return reports.data;
}
