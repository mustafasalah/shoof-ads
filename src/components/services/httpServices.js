import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_HOSTNAME}/api`;
axios.defaults.contentType = "text/plain";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	(config) => {
		if (process.env.NODE_ENV === "development") console.log(config);
		return config;
	},
	(error) => {
		if (process.env.NODE_ENV === "development") console.dir(error);
		return Promise.reject(error);
	}
);

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
};

export default http;
