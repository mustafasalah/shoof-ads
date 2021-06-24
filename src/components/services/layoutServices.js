import http from "./httpServices";

export const getLayout = async () => {
	return http.get("/layout");
};

export const sortLayout = async (dropzone, data) => {
	return http.put(`/layout/sort/${dropzone}`, data);
};

export default getLayout;
