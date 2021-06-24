import * as ACTIONS from "../actions/ActionTypes";
import { toast } from "react-toastify";
import { deepCopy } from "./../js/Utility";

const types = [
	"shows",
	"episodes",
	"comments",
	"reviews",
	"reports",
	"users",
	"pages",
];

const initialState = [];
// set loading property in initial state to show loading state in UI
initialState.loading = true;

const dataReducer = (dataType) => (state = initialState, { type, ...rest }) => {
	switch (type) {
		case ACTIONS.CHANGE_STATUS:
			let { meta } = rest;
			if (dataType !== meta.dataType) return state;

			if (rest.error) {
				toast.error(rest.payload.message);
				return state;
			}

			if (meta.id.length) {
				toast.success(
					`The status of the selected ${meta.dataType} has been successfully changed!`
				);
				return state.map((data) => {
					if (meta.id.indexOf(data.id) !== -1) {
						data = deepCopy(data);
						data.status = meta.status;
					}
					return data;
				});
			}

			return state;

		case ACTIONS.DELETE_DATA:
			if (dataType !== rest.meta.dataType) return state;
			let {
				meta: { id, dataType: typeName },
			} = rest;

			if (rest.error) {
				toast.error(rest.payload.message);
				return state;
			} else {
				if (id instanceof Array) {
					if (id.length) {
						toast.success(
							`The selected ${typeName} were deleted successfully!`
						);

						return state.filter((data) => {
							return id.indexOf(data.id) === -1;
						});
					}

					return state;
				} else {
					toast.success(
						`The ${typeName.slice(0, -1)} was deleted successfully!`
					);
					return state.filter((data) => data.id !== +id);
				}
			}

		case ACTIONS.LOAD_APP_DATA:
			const payloadData = rest.payload[types.indexOf(dataType)];
			if (payloadData === undefined) return state;

			const { status, value, reason } = payloadData;

			if (status === "fulfilled") {
				if (typeof rest.meta.callback === "function") {
					rest.meta.callback();

					// to prevent calling the callback more than once
					delete rest.meta.callback;
				}
				return value;
			} else {
				toast.error(`${reason.message} in loading ${dataType} data`);
				return state;
			}

		case ACTIONS.LOAD_DATA:
			if (dataType !== rest.dataType) return state;
			return rest.data;

		default:
			return state;
	}
};

export default dataReducer;
