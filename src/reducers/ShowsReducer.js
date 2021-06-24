import * as ACTIONS from "../actions/ActionTypes";

const ShowsReducer = (state = [], { type, shows }) => {
	if (type === ACTIONS.LOAD_SHOWS) return shows;
	return state;
};

export default ShowsReducer;
