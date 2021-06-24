import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "./../components/services/httpServices";
import { showSchema } from "./ValidationSchema";
import store from "./../store";
import {
	handleWatchingVideoUpload,
	handleFileUpload,
	handleGalleryDelete,
	handleGalleryUpload,
	handleVideosFilesUpload,
} from "./UploadHandlers";
import {
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
} from "./MediaFormActions";
import FormActions from "./FormActions";

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(showSchema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const { data } = await http[http_method](
				`/shows/${value.id || ""}`,
				value
			);
			toast.success("The show information have been saved!");

			// handle poster, background and square images upload process
			if (
				value.poster instanceof File ||
				value.background instanceof File ||
				(value.square_image && value.square_image instanceof File) ||
				(value.square_image && value.square_image.delete)
			) {
				await handleFileUpload(data, value);
			}

			// handle gallery images upload process
			const uploadedGalleryImages = value.gallery.filter(
				(image) => image.path
			);
			if (uploadedGalleryImages.length) {
				await handleGalleryUpload(data, uploadedGalleryImages);
			}

			// handle gallery images delete process
			const deletedGalleryImages = value.gallery.filter(
				(image) => image.delete
			);
			if (deletedGalleryImages.length) {
				await handleGalleryDelete(data, deletedGalleryImages);
			}

			// handle watching videos upload process
			await handleWatchingVideoUpload(data, value.watching_servers[0]);

			// handle download videos upload process
			await handleVideosFilesUpload(data, value.video_files);

			// reflect the updated show in shows list
			FormActions.updateList("shows");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				loggedUser: store.getState().loggedUser,
				formType: "show",
			};
		} catch (ex) {
			// alert the network error
			toast.error(ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "show",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "show" };
	}
};

const onFormTypeChange = (showType) => {
	return {
		type: ACTIONS.CHANGE_FORM_TYPE,
		showType: showType,
	};
};

const onShowImageDelete = (imageField) => {
	return {
		type: ACTIONS.DELETE_SHOW_IMAGE,
		imageField,
	};
};

const onShowDataLoad = (data) => ({
	type: ACTIONS.LOAD_SHOW_DATA,
	data,
	formType: "show",
});

const showFormActions = {
	onFormSubmit,
	onFieldChanged: FormActions.onFieldChanged("show"),
	onFormReset: FormActions.onFormReset("show"),
	onFormTypeChange,
	onWatchVideoFileDelete,
	onWatchVideoPlayerDelete,
	onVideoFileDelete,
	onVideoLinkDelete,
	onVideoInfoDelete,
	onShowImageDelete,
	onShowDataLoad,
};

export default showFormActions;