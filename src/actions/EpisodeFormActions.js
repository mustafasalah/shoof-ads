import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import store from "../store";
import http from "../components/services/httpServices";
import { episodeSchema } from "./ValidationSchema";
import FormActions from "./FormActions";
import {
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
} from "./MediaFormActions";
import {
	handleWatchingVideoUpload,
	handleVideosFilesUpload,
} from "./UploadHandlers";

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(episodeSchema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const { data } = await http[http_method](
				`/episodes/${value.id || ""}`,
				value
			);
			toast.success("The episode information have been saved!");

			// handle watching videos upload process
			await handleWatchingVideoUpload(data, value.watching_servers[0]);

			// handle download videos upload process
			await handleVideosFilesUpload(data, value.video_files);

			// reflect the updated show in shows list
			FormActions.updateList("episodes");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				loggedUser: store.getState().loggedUser,
				formType: "episode",
			};
		} catch (ex) {
			// alert the network error
			toast.error(ex.response.data || ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "episode",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "episode" };
	}
};

const onEpisodeDataLoad = (data) => ({
	type: ACTIONS.LOAD_EPISODE_DATA,
	data,
	formType: "episode",
});

const onShowIdChange = () => ({
	type: ACTIONS.RESET_EPISODE_ARC,
});

const episodeFormActions = {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("episode"),
	onFormReset: FormActions.onFormReset("episode"),
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
	onEpisodeDataLoad,
	onShowIdChange,
};

export default episodeFormActions;