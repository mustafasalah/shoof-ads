import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SectionHeader from "../common/SectionHeader";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import countires from "./../services/getCountries";
import FormSideSection from "./../common/form/FormSideSection";
import AvatarField from "./AvatarField";
import UserFormActions from "../../actions/UserFormActions";
import getUsers from "../services/usersServices";

const UserForm = ({
	data,
	loggedUser,
	onFormSubmit: onSubmit,
	onFormReset: onReset,
	onUserDataLoad,
}) => {
	const history = useHistory();
	const params = useParams();
	const userId = params.id && Number(params.id);

	useEffect(() => {
		(async () => {
			// To reset form fields to its default value
			// (if the user edit user and then go to new one this will delete edited user state)
			if (userId === undefined) return onReset();

			// loading user data from server side and set it in form state
			try {
				const userData = await getUsers(userId);
				onUserDataLoad(userData);
			} catch (ex) {
				toast.error("There is no user with this id: " + userId, {
					autoClose: 2500,
					onClose: () => history.goBack(),
				});
			}
		})();
	}, []);

	return (
		<Fragment>
			<SectionHeader
				name={`${userId ? "Edit" : "New"} User`}
				faClass={`fas ${userId ? "fa-edit" : "fa-user-plus"}`}
			/>
			<form
				method="POST"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(data, () => {
						history.push("/users/");
					});
				}}
			>
				<div id="main-side">
					<FormSection header="User Information">
						<div className="row">
							<div className="col-2">
								<FormField
									name="user.username"
									label="Username"
									type="text"
									placeholder="e.g. mustafa"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.email"
									label="Email"
									type="email"
									placeholder="e.g. example@MEVid.com"
									required
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.password"
									label="Password"
									type="password"
									required
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.confirm_password"
									label="Confirm Password"
									type="password"
									required
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.first_name"
									label="First Name"
									type="text"
									placeholder="e.g. Mustafa"
									required
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.last_name"
									label="Last Name"
									type="text"
									placeholder="e.g. Salah"
								/>
							</div>
							<div className="col-2">
								<div className="row">
									<div className="col-2">
										<FormField
											name="user.gender"
											label="Gender"
											type="select"
											placeholder="Select Gender"
											options={[
												{ label: "Male", value: "m" },
												{ label: "Female", value: "f" },
											]}
										/>
									</div>
									<div className="col-2">
										<FormField
											name="user.age"
											label="Age"
											type="number"
											min={10}
											max={100}
										/>
									</div>
								</div>
							</div>
							<div className="col-2">
								<FormField
									name="user.country"
									label="Country"
									type="select"
									placeholder="Select Country"
									options={countires}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-1">
								<FormField
									name="user.about"
									label="About"
									type="textarea"
									placeholder="Something about user here..."
								/>
							</div>
						</div>
					</FormSection>

					<FormSection
						header="Social Media Accounts"
						faClass="fas fa-share-alt"
					>
						<div className="row">
							<div className="col-2">
								<FormField
									name="user.social_accounts.facebook"
									label="Facebook Account"
									type="url"
									placeholder="e.g. https://www.facebook.com/mevid"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.social_accounts.twitter"
									label="Twitter Account"
									type="url"
									placeholder="e.g. https://www.twitter.com/mevid"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.social_accounts.instagram"
									label="Instagram Account"
									type="url"
									placeholder="e.g. https://www.instagram.com/mevid"
								/>
							</div>
							<div className="col-2">
								<FormField
									name="user.social_accounts.youtube"
									label="Youtube Account"
									type="url"
									placeholder="e.g. https://www.youtube.com/mevid"
								/>
							</div>
						</div>
					</FormSection>
				</div>
				<div id="end-side">
					<FormSideSection label="User Avatar" id="user-avatar">
						<div className="row">
							<AvatarField />
						</div>
					</FormSideSection>

					<FormSideSection label="Account Settings" id="user-options">
						<div className="row">
							<div className="col-1">
								<FormField
									name="user.role"
									label="Account Role"
									type="select"
									disabled={
										userId === 1 || loggedUser.id === userId
									}
									options={[
										{ label: "User", value: "user" },
										{
											label: "Publisher",
											value: "publisher",
										},
										{
											label: "Supervisor",
											value: "supervisor",
										},
										{ label: "Admin", value: "admin" },
									]}
								/>
							</div>
							<div className="col-1">
								<FormField
									name="user.email_verification"
									label="Email Verification"
									type="select"
									options={[
										{ label: "Verified", value: "1" },
										{ label: "Not verified", value: "0" },
									]}
								/>
							</div>

							{userId !== undefined &&
								userId !== loggedUser.id &&
								userId !== 1 && (
									<div className="col-1">
										<FormField
											name="user.banned"
											label="Account Status"
											type="select"
											options={[
												{ label: "Active", value: "0" },
												{ label: "Banned", value: "1" },
											]}
										/>
									</div>
								)}
						</div>

						<button
							type="submit"
							className="primary-btn focus-shadow radius"
						>
							{userId ? "Update User" : "Create User"}
						</button>
					</FormSideSection>
				</div>
			</form>
		</Fragment>
	);
};

export default connect(
	(state) => ({ data: state.forms.user.data, loggedUser: state.loggedUser }),
	UserFormActions
)(UserForm);
