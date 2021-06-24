import * as ACTIONS from "./ActionTypes";
import getShows from "./../components/services/showsServices";
import getComments from "./../components/services/commentsServices";
import getReviews from "../components/services/reviewsServices";
import getReports from "./../components/services/reportsServices";
import getPages from "../components/services/pagesServices";
import getUsers from "./../components/services/usersServices";
import getEpisodes from "./../components/services/episodesServices";
import auth from "./../components/services/authServices";
import store from "./../store";

const loginUser = () => ({
	type: ACTIONS.LOGIN_USER,
	payload: auth(),
});

const loadAppData = (callback) => {
	const payload = [
		getShows(),
		getEpisodes(),
		getComments(),
		getReviews(),
		getReports(),
		getUsers(),
	];

	// if the logged user is admin then load pages data as well
	if (store.getState().loggedUser.role === "admin") {
		payload.push(getPages());
	}

	return {
		type: ACTIONS.LOAD_APP_DATA,
		payload: Promise.allSettled(payload),
		meta: {
			callback,
		},
	};
};

export const appActions = {
	loginUser,
	loadAppData,
};
