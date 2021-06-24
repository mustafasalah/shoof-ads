import { combineReducers } from "redux";
import * as ACTIONS from "../actions/ActionTypes";
import showsTableReducer from "./ShowsTableReducer";
import episodesTableReducer from "./EpisodesTableReducer";
import commentsTableReducer from "./CommentsTableReducer";
import reviewsTableReducer from "./ReviewsTableReducer";
import reportsTableReducer from "./ReportsTableReducer";
import pagesTableReducer from "./PagesTableReducer";
import usersTableReducer from "./UsersTableReducer";
import loginReducer from "./LoginReducer";
import dataReducer from "./DataReducer";
import SchedulerReducer from "./SchedulerReducer";
import formReducer from "./FormReducer";
import notificationsReducer from "./NotificationsReducer";
import layoutReducer from "./LayoutReducer";
import mainMenuReducer from "./MainMenuReducer";

const AppReducer = combineReducers({
	layout: combineReducers({
		header: layoutReducer("header"),
		main: layoutReducer("main"),
		sidebar: layoutReducer("sidebar"),
		footer: layoutReducer("footer"),
	}),
	mainmenu: mainMenuReducer,
	forms: combineReducers({
		show: formReducer("show"),
		episode: formReducer("episode"),
		page: formReducer("page"),
		user: formReducer("user"),
		settings: formReducer("settings"),
		layout: formReducer("layout"),
		mainmenu: formReducer("mainmenu"),
		submenu: formReducer("submenu"),
	}),
	schedule: SchedulerReducer,
	notifications: notificationsReducer,
	pages: dataReducer("pages"),
	episodes: dataReducer("episodes"),
	users: dataReducer("users"),
	comments: dataReducer("comments"),
	reviews: dataReducer("reviews"),
	reports: dataReducer("reports"),
	shows: dataReducer("shows"),
	loggedUser: loginReducer,
	tables: combineReducers({
		shows: showsTableReducer("shows"),
		movies: showsTableReducer("movies"),
		animes: showsTableReducer("animes"),
		tvshows: showsTableReducer("tvshows"),
		episodes: episodesTableReducer,
		comments: commentsTableReducer,
		reviews: reviewsTableReducer,
		reports: reportsTableReducer,
		pages: pagesTableReducer,
		users: usersTableReducer,
	}),
	// loaded state is state used to show and hide loader
	loaded: (loaded = false, { type }) => {
		if (type === ACTIONS.APP_LOADED) return true;
		return loaded;
	},
});

export default AppReducer;
