import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";
import FormField from "../common/form/FormField";

const AvatarField = ({ avatar, dispatch }) => {
	const haveAvatar = avatar && avatar.url;
	return (
		<Fragment>
			<div className="col-3-1">
				<span
					id="avatar-image-preview"
					className={`image blur-shadow radius${
						haveAvatar ? "" : " empty"
					}`}
					style={{
						backgroundImage: `${
							haveAvatar ? "url('" + avatar.url + "')" : "none"
						}`,
					}}
				></span>
			</div>
			<div className="col-3-2">
				<div className="avatar-image-btns">
					{haveAvatar || avatar instanceof File ? (
						<Fragment>
							<p
								className="note radius"
								style={{ marginTop: 0, marginBottom: 15 }}
							>
								{avatar.name +
									(avatar.size
										? ` / ${
												(avatar.size / 1e6).toFixed(2) +
												"MB"
										  }`
										: "")}
							</p>
							<button
								className="dark-btn delete-btn radius focus-shadow"
								onClick={(e) => {
									e.preventDefault();
									const deleteIt = window.confirm(
										"Are you sure to delete this avatar image?"
									);
									deleteIt &&
										dispatch({
											type: ACTIONS.DELETE_USER_AVATAR,
											formType: "user",
										});
								}}
							>
								Delete Profile Image
							</button>
						</Fragment>
					) : (
						<FormField
							type="file"
							name="user.avatar"
							label="Upload Image"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/*"
							unwrappedField
							labelAfter
						/>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default connect((state) => ({ avatar: state.forms.user.data.avatar }))(
	AvatarField
);
