import http from "./httpServices";

const getMenuStructure = () => {
	return http.get("/mainmenu");
};

export const moveItem = (index, nestedIn, direction) => {
	return http.put(`/mainmenu/move/${direction}`, {
		index,
		nestedIn,
	});
};

export const sortMenu = (nestedIn, oldIndex, newIndex) => {
	return http.put("/mainmenu/sort", {
		nestedIn,
		oldIndex,
		newIndex,
	});
};

export const deleteMenuItem = (id) => {
	return http.delete(`/mainmenu/${id}`);
};

export const submitMenuItem = (item) => {
	return http[item.id ? "put" : "post"]("/mainmenu", item);
};

export default getMenuStructure;
