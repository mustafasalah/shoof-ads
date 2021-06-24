import React, { Fragment } from "react";
import FormField from "../common/form/FormField";
import { connect } from "react-redux";
import { toFileSize } from "./../../js/Utility";
import SettingsActions from "../../actions/SettingsActions";

const SiteBackgroundField = ({ background, dark_background, onDelete }) => {
	const isBgUploaded =
		(background.delete !== true && background.url) ||
		background instanceof File;

	const isDarkBgUploaded =
		(dark_background.delete !== true && dark_background.url) ||
		dark_background instanceof File;
	return (
		<Fragment>
			<div className="row">
				<div className="col-1 center">
					<span className="version">Light Version</span>
				</div>
				<div className="col-5-1">
					<span
						className="image blur-shadow radius light-bg"
						style={{
							backgroundImage: `${
								background.url
									? `url("${background.url}")`
									: "none"
							}`,
						}}
					></span>
				</div>
				{background.name && (
					<div className="col-5-4">
						<p className="note radius">
							{background.name +
								(background.size
									? ` / ${toFileSize(background.size)}`
									: "")}
						</p>
					</div>
				)}
				<div className={background.name ? "col-1 center" : "col-5-4"}>
					<div id="favicon-btns">
						<FormField
							type="file"
							name="settings.site_background"
							label="Upload Image"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/*"
							unwrappedField
							labelAfter
							htmlAfterField={
								isBgUploaded ? (
									<button
										onClick={(e) =>
											onDelete("site_background")
										}
										type="button"
										className="dark-btn delete-btn radius focus-shadow"
									>
										Delete
									</button>
								) : undefined
							}
						/>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-1 center">
					<span className="version">Dark Version</span>
				</div>
				<div className="col-5-1">
					<span
						className="image blur-shadow radius dark-bg"
						style={{
							backgroundImage: `${
								dark_background.url
									? `url("${dark_background.url}")`
									: "none"
							}`,
						}}
					></span>
				</div>
				{dark_background.name && (
					<div className="col-5-4">
						<p className="note radius">
							{dark_background.name +
								(dark_background.size
									? ` / ${toFileSize(dark_background.size)}`
									: "")}
						</p>
					</div>
				)}
				<div
					className={
						dark_background.name ? "col-1 center" : "col-5-4"
					}
				>
					<div id="favicon-btns">
						<FormField
							type="file"
							name="settings.dark_site_background"
							label="Upload Image"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/*"
							unwrappedField
							labelAfter
							htmlAfterField={
								isDarkBgUploaded ? (
									<button
										onClick={() =>
											onDelete("dark_site_background")
										}
										type="button"
										className="dark-btn delete-btn radius focus-shadow"
									>
										Delete
									</button>
								) : undefined
							}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		background: state.forms.settings.data.site_background,
		dark_background: state.forms.settings.data.dark_site_background,
	}),
	{ onDelete: SettingsActions.onImageDelete }
)(SiteBackgroundField);
