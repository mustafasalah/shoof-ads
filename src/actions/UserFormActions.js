import * as ACTIONS from "./ActionTypes";
import joi from "@hapi/joi";
import { toast } from "react-toastify";
import http from "../components/services/httpServices";
import { handleProfileImageUpload } from "./UploadHandlers";
import { userSchema } from "./ValidationSchema";
import FormActions from "./FormActions";

const onFormSubmit = async (data, callback) => {
	// if this submitted data will edit user data (not add new one) make password field optional
	data.id !== "" && (userSchema.password = userSchema.password.optional());

	const { value, error } = joi.object(userSchema).validate(data);

	if (!error) {
		try {
			const http_method = value.id ? "put" : "post";
			const { data } = await http[http_method](
				`/users/${value.id || ""}`,
				value
			);

			toast.success("The user information have been saved!");

			if (value.email_verification === "0") {
				toast.info(
					"The activation code has been sent to the user's email"
				);
			}
			// avatar image upload handling
			if (
				value.avatar !== undefined &&
				(value.avatar instanceof File || value.avatar.delete)
			) {
				// handle upload request here
				await handleProfileImageUpload(data.id, value.avatar);
			}

			// reflect the updated page in pages list
			FormActions.updateList("users");

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: null,
				callback,
				formType: "user",
			};
		} catch (ex) {
			// alert the network error
			if (ex.response) toast.error(ex.response.data);
			else {
				toast.error(ex);
			}

			return {
				type: ACTIONS.SUBMIT_FORM,
				error: ex,
				formType: "user",
			};
		}
	} else {
		// alert the validation error
		toast.error(error.message);
		return { type: ACTIONS.SUBMIT_FORM, error, formType: "user" };
	}
};

const onUserDataLoad = (data, callback) => ({
	type: ACTIONS.LOAD_USER_DATA,
	data,
	formType: "user",
	callback,
});

const userFormActions = {
	onFormSubmit,
	onFieldChange: FormActions.onFieldChanged("user"),
	onFormReset: FormActions.onFormReset("user"),
	onUserDataLoad,
};

export default userFormActions;