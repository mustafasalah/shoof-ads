import * as ACTIONS from "./ActionTypes";
import http from "./../components/services/httpServices";

const mapStatus = new Map([
	["publish", "published"],
	["draft", "drafted"],
	["approve", "approved"],
	["unapprove", "unapproved"],
	["active", "active"],
	["ban", "banned"],
]);

const getDataActions = (dataType) => ({
	loadData: (data) => ({
		type: ACTIONS.LOAD_DATA,
		dataType,
		data,
	}),

	changeStatus: (id, status) => {
		let payload;
		if (id.length) {
			payload = http.put(`/${dataType}/`, {
				[dataType + "_id"]: id,
				status: status,
			});
		} else {
			payload = Promise.resolve([]);
		}

		return {
			type: ACTIONS.CHANGE_STATUS,
			payload,
			meta: {
				id,
				status: mapStatus.get(status),
				dataType,
			},
		};
	},

	deleteData: (id) => {
		let payload;
		if (id instanceof Array) {
			if (id.length === 0) payload = Promise.resolve([]);
			else {
				payload = http.delete(`/${dataType}/`, {
					data: {
						["deleted_" + dataType + "_id"]: id,
					},
				});
			}
		} else {
			payload = http.delete(`/${dataType}/${id}`);
		}

		return {
			type: ACTIONS.DELETE_DATA,
			payload,
			meta: { id, dataType },
		};
	},
});

export default getDataActions;
