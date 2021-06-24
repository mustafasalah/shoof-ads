import store from "./../../store";

export default function getAuthors() {
	return store
		.getState()
		.users.filter((user) => user.role !== "user")
		.map((user) => ({ id: user.id, name: user.username }));
}
