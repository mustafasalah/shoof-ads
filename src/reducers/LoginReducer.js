import * as ACTIONS from "../actions/ActionTypes";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;
const loginReducer = (state = {}, { type, payload, error }) => {
	if (type === ACTIONS.LOGIN_USER) {
		if (error || payload.status !== 200) {
			redirectToLoginPage();
			return state;
		}
		return payload.data;
	}

	return state;
};

const redirectToLoginPage = () => {
	window.location.assign((HOSTNAME ? HOSTNAME : "") + "/login");
};

export default loginReducer;
