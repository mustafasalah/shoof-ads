import * as ACTIONS from "../actions/ActionTypes";
import { getNestedProperty, setNestedProperty, deepCopy } from "../js/Utility";
import initialShowState, { listItemsDefaults } from "./InitialShowState";
import initialEpisodeState from "./InitialEpisodeState";
import initialPageState from "./InitialPageState";
import initialUserState from "./InitialUserState";
import initialSettingsState from "./InitialSettingsState";
import initialLayoutState from "./InitialLayoutState";
import initialMenuState from "./InitialMenuState";
import initialSubMenuState from "./InitialSubMenuState";
import { toast } from "react-toastify";

const formReducer = (formType) => {
	let initialState;

	switch (formType) {
		case "show":
			initialState = initialShowState;
			break;

		case "episode":
			initialState = initialEpisodeState;
			break;

		case "page":
			initialState = initialPageState;
			break;

		case "user":
			initialState = initialUserState;
			break;

		case "settings":
			initialState = initialSettingsState;
			break;

		case "layout":
			initialState = initialLayoutState;
			break;

		case "mainmenu":
			initialState = initialMenuState;
			break;

		case "submenu":
			initialState = initialSubMenuState;
			break;

		default:
			initialState = { data: {}, errors: {} };
	}

	return (state = initialState, { type, ...payload }) => {
		let newState;

		if (formType !== payload.formType && payload.formType !== undefined) {
			return state;
		}

		switch (type) {
			case ACTIONS.EDIT_SUB_MENU:
				return {
					data: { ...initialState.data, nested_in: payload.id },
					errors: { ...initialState.errors },
				};

			case ACTIONS.EDIT_MAIN_MENU_ITEM:
			case ACTIONS.EDIT_SUB_MENU_ITEM:
				const {
					item: { id, label, link, type: link_type, nested_in },
				} = payload;

				newState = {
					data: {
						id,
						label,
						link,
						type: link_type,
						nested_in,
					},
					errors: {},
				};

				if (type === ACTIONS.EDIT_MAIN_MENU_ITEM) {
					delete newState.data.nested_in;
				}

				return newState;

			case ACTIONS.DELETE_LAYOUT_WIDGET:
			case ACTIONS.ADD_WIDGET_TO_LAYOUT:
				if (payload.meta.formType !== formType) return state;
				return {
					data: {},
					errors: {},
				};

			case ACTIONS.LOAD_LAYOUT_WIDGET_FORM:
				return {
					data: { ...payload.widget, position: payload.position },
					errors: {},
				};

			case ACTIONS.ADD_LAYOUT_WIDGET_FORM:
				return {
					data: { ...payload.widget },
					errors: {},
				};

			case ACTIONS.LOAD_SETTINGS_DATA:
				if (payload.meta && payload.meta.formType === formType) {
					if (payload.error) {
						toast.error(
							payload.payload.message + " in loading settings"
						);
						return state;
					}
					newState = {
						errors: { ...initialState.errors },
						data: payload.payload,
					};
					return newState;
				}
				return state;

			case ACTIONS.RESET_FORM:
				newState = {
					errors: { ...initialState.errors },
					data: {
						...initialState.data,
						...payload.filledFields,
					},
				};

				// Keep author data when reset form
				if (state.data.author !== undefined) {
					newState.data.author = state.data.author;
				}

				return newState;

			case ACTIONS.LOGIN_USER:
				newState = {
					errors: { ...state.errors },
					data: { ...state.data },
				};

				// if the form have author field property then set it to logged user
				if (state.data.author !== undefined && payload.payload.data) {
					newState.data.author = payload.payload.data.id;
				}

				return newState;

			case ACTIONS.DELETE_APP_IMAGE:
				const { imageType } = payload;
				if (state.data[imageType] instanceof File) {
					newState = {
						errors: state.errors,
						data: { ...state.data },
					};
					newState.data[imageType] = "";
					return newState;
				} else if (state.data[imageType].url) {
					newState = {
						errors: state.errors,
						data: {
							...state.data,
							[imageType]: {
								delete: true,
							},
						},
					};
					return newState;
				}
				return state;

			case ACTIONS.DELETE_USER_AVATAR:
				return {
					errors: state.errors,
					data: {
						...state.data,
						avatar: { delete: true },
					},
				};

			case ACTIONS.DELETE_VIDEO_INFO:
				return {
					errors: state.errors,
					data: {
						...state.data,
						video_files: state.data.video_files.map(
							(video_file, i) => {
								if (i === payload.videoInfoNo) {
									video_file.delete = true;
								}
								return video_file;
							}
						),
					},
				};

			case ACTIONS.DELETE_VIDEO_LINK:
				return {
					errors: state.errors,
					data: {
						...state.data,
						video_files: state.data.video_files.map(
							(video_file, i) => {
								if (i !== payload.videoInfoNo)
									return video_file;
								return {
									...video_file,
									download_servers: video_file.download_servers.map(
										(server, i) => {
											if (i === payload.serverNo) {
												server.delete = true;
											}
											return server;
										}
									),
								};
							}
						),
					},
				};

			case ACTIONS.DELETE_VIDEO_FILE:
				newState = deepCopy(state);
				newState.data.video_files[
					payload.videoNo
				].download_servers[0].file = null;
				return newState;

			case ACTIONS.DELETE_WATCH_SERVER:
				return {
					errors: state.errors,
					data: {
						...state.data,
						watching_servers: state.data.watching_servers.filter(
							(server, i) => i !== payload.serverNo
						),
					},
				};

			case ACTIONS.DELETE_WATCH_VIDEO_FILE:
				newState = deepCopy(state);
				newState.data.watching_servers[0].files[
					payload.resolution
				].delete = true;
				return newState;

			case ACTIONS.DELETE_GALLERY_IMAGE:
				if (formType !== "show") return state;
				return {
					errors: state.errors,
					data: {
						...state.data,
						gallery: state.data.gallery.map((img, i) => {
							if (i === payload.imageIndex) {
								img.delete = true;
							}
							return img;
						}),
					},
				};

			case ACTIONS.LOAD_EPISODE_DATA:
			case ACTIONS.LOAD_SHOW_DATA:
				const showData = { ...initialState.data, ...payload.data };

				if (showData.watching_servers.length === 0) {
					showData.watching_servers =
						initialState.data.watching_servers;
				} else {
					const haveFilesField = showData.watching_servers.some(
						(server) => server.files !== undefined
					);

					const havePlayerField = showData.watching_servers.some(
						(server) => server.code !== undefined
					);

					if (!haveFilesField) {
						showData.watching_servers.unshift(
							initialState.data.watching_servers[0]
						);
					}

					if (!havePlayerField) {
						showData.watching_servers.push(
							initialState.data.watching_servers[1]
						);
					}
				}

				if (showData.video_files.length === 0) {
					showData.video_files = initialState.data.video_files;
				}

				return {
					errors: state.errors,
					data: showData,
				};

			case ACTIONS.LOAD_PAGE_DATA:
			case ACTIONS.LOAD_USER_DATA:
				if (typeof payload.callback === "function") {
					payload.callback(payload.data);
				}
				return {
					data: payload.data,
					errors: state.errors,
				};

			case ACTIONS.DELETE_SHOW_IMAGE:
				if (formType !== "show") return state;
				const { imageField } = payload;
				const deletedImage = state.data[imageField];
				deletedImage.delete = true;

				return {
					errors: state.errors,
					data: { ...state.data, [imageField]: deletedImage },
				};

			case ACTIONS.CHANGE_FORM_TYPE:
				if (formType !== "show") return state;
				return {
					errors: { ...initialState.errors },
					data: {
						...initialState.data,
						type: payload.showType,
						author: state.data.author,
					},
				};

			case ACTIONS.SUBMIT_FORM:
				const {
					error,
					callback,
					donotResetFields,
					noReset = false,
				} = payload;

				// if there is error, show it to the user
				if (error) {
					newState = deepCopy(state);
					if (error.details) {
						const fieldName = error.details[0].context.key;
						if (fieldName in newState.data) {
							newState["errors"][fieldName] = error.details[0];
						}
					}
					return newState;
				}

				// if there is  callback then schedule it to be called after 0.5s
				typeof callback === "function" &&
					window.setTimeout(callback, 500);

				let submitedData = {
					// if noReset option is true then all
					// fields will not be reset after form was submited
					...(noReset ? state.data : initialState.data),
				};

				// Fields that we don't want to reset their values after submit
				if (donotResetFields && noReset === false) {
					for (let field of donotResetFields) {
						if (state.data[field] === undefined) continue;
						submitedData[field] = state.data[field];
					}
				}

				// if the form have author field property then set it to logged user
				if (state.data.author !== undefined) {
					const { loggedUser } = payload;
					submitedData.author = loggedUser
						? loggedUser.id
						: state.data.author;
				}

				return {
					errors: { ...initialState.errors },
					data: submitedData,
				};

			case ACTIONS.DELETE_LINK_IN_LINKS_LIST_WIDGET:
				return {
					data: {
						...state.data,
						settings: {
							...state.data.settings,
							links: state.data.settings.links.filter(
								(link, i) => i !== payload.index
							),
						},
					},
					errors: state.errors,
				};

			case ACTIONS.MOVE_LINK_IN_LINKS_LIST_WIDGET:
				const { index, direction } = payload;
				const newLinks = [...state.data.settings.links];
				const movement = direction === "up" ? -1 : 1;
				const temp = newLinks[index];
				newLinks[index] = newLinks[index + movement];
				newLinks[index + movement] = temp;

				return {
					data: {
						...state.data,
						settings: {
							...state.data.settings,
							links: newLinks,
						},
					},
					errors: state.errors,
				};

			case ACTIONS.ADD_LINK_IN_LINKS_LIST_WIDGET:
				delete payload.link.id;
				return {
					data: {
						...state.data,
						settings: {
							...state.data.settings,
							links: [...state.data.settings.links, payload.link],
						},
					},
					errors: state.errors,
				};

			case ACTIONS.UPDATE_LINK_IN_LINKS_LIST_WIDGET:
				return {
					data: {
						...state.data,
						settings: {
							...state.data.settings,
							links: state.data.settings.links.map((link, i) => {
								if (payload.link.id === i) {
									delete payload.link.id;
									return payload.link;
								}
								return link;
							}),
						},
					},
					errors: state.errors,
				};

			case ACTIONS.FORM_ADD:
				let { error: fieldError, fieldName, fieldValue } = payload;

				newState = deepCopy(state);
				newState["errors"][fieldName] =
					fieldError && fieldError.details[0];

				if (fieldName === "gallery") {
					fieldValue = newState.data.gallery
						.filter((img) => img.url)
						.concat(fieldValue);
				}
				setNestedProperty(newState.data, fieldName, fieldValue);

				// remove error when field value is empty
				if (fieldValue === "") delete newState["errors"][fieldName];

				return newState;

			case ACTIONS.FORM_ADD_ITEM_LIST:
				const { formName, listName } = payload;

				if (formName === formType) {
					newState = {
						errors: state.errors,
						data: deepCopy(state.data),
					};
					setNestedProperty(newState.data, listName, [
						...getNestedProperty(newState.data, listName),
						{
							...listItemsDefaults[
								listName.replace(/\.\d*\./g, ".")
							],
						},
					]);
					return newState;
				}
				return state;

			case ACTIONS.DELETE_ARC:
				if (formType !== "show") return state;
				const { key } = payload;

				// Get a Copy of the state
				newState = {
					errors: state.errors,
					data: deepCopy(state.data),
				};

				// Delete Arc from Arcs List
				newState.data.arcs.list = newState.data.arcs.list.filter(
					(arc) => arc.key !== key
				);

				return newState;

			case ACTIONS.UPDATE_ARC:
				if (formType !== "show") return state;
				const { data } = payload;

				// Get a Copy of the state
				newState = {
					errors: state.errors,
					data: deepCopy(state.data),
				};

				// Reset Arc Form Fields
				newState.data.arcs.form = { id: "", key: "", no: "", name: "" };

				if (data.key === "") {
					// Add Arc Logic
					data.key = newState.data.arcs.list.length;
					newState.data.arcs.list = [...state.data.arcs.list, data];
				} else {
					// Update Arc Logic
					newState.data.arcs.list = state.data.arcs.list.map(
						(arc) => {
							if (arc.key === data.key) return data;
							return arc;
						}
					);
				}

				return newState;

			case ACTIONS.EDIT_ARC:
				if (formType !== "show") return state;
				const { arc_data } = payload;
				return {
					errors: state.errors,
					data: {
						...state.data,
						arcs: { ...state.data.arcs, form: arc_data },
					},
				};

			case ACTIONS.RESET_EPISODE_ARC:
				if (formType !== "episode") return state;
				return {
					data: { ...state.data, episode_arc: "" },
					errors: state.errors,
				};

			default:
				return state;
		}
	};
};

export default formReducer;
