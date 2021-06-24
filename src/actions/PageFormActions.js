import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import store from "../store";
import http from "../components/services/httpServices";
import { pageSchema } from "./ValidationSchema";
import FormActions from "./FormActions";

const onFormSubmit = async (data, callback) => {
	const { value, error } = joi.object(pageSchema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			await http[http_method](`/pages/${value.id || ""}`, value);

			toast.success("The page information have been saved!");

			// reflect the updated page in pages list
			FormActions.updateList("pages");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				loggedUser: store.getState().loggedUser,
				formType: "page",
			};
		} catch (ex) {
			// alert the network error
			toast.error(ex.message);
			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "page",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "page" };
	}
};

const onPageDataLoad = (data, callback) => ({
	type: ACTIONS.LOAD_PAGE_DATA,
	data,
	formType: "page",
	callback,
});

const pageFormActions = {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("page"),
	onFormReset: FormActions.onFormReset("page"),
	onPageDataLoad,
};

export default pageFormActions;