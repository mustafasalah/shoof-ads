import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise";
import AppReducer from "./reducers/AppReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	AppReducer,
	composeEnhancers(applyMiddleware(promiseMiddleware))
);

export default store;
