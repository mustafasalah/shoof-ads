import React, { Fragment } from "react";
import FormField from "../common/form/FormField";
import { connect } from "react-redux";
import { toFileSize } from "./../../js/Utility";
import SettingsActions from "../../actions/SettingsActions";

const FaviconField = ({ favicon, onDelete }) => {
	const isFaviconUploaded =
		favicon instanceof File || (favicon.delete !== true && favicon.url);
	return (
		<Fragment>
			<div className="row">
				<div className="col-5-1">
					<span
						className="image blur-shadow radius"
						style={{
							backgroundImage: `${
								favicon.url ? `url("${favicon.url}")` : "none"
							}`,
						}}
					></span>
				</div>
				{favicon.name && (
					<div className="col-5-4">
						<p className="note radius">
							{favicon.name +
								(favicon.size
									? ` / ${toFileSize(favicon.size)}`
									: "")}
						</p>
					</div>
				)}
				<div className={favicon.name ? "col-1 center" : "col-5-4"}>
					<div id="favicon-btns">
						<FormField
							type="file"
							name="settings.favicon"
							label="Upload Image"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/png,image/x-icon,image/gif"
							unwrappedField
							labelAfter
							htmlAfterField={
								isFaviconUploaded ? (
									<button
										onClick={() => onDelete("favicon")}
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
			<div className="row note">
				<div className="col-1">
					<small>
						Note: Image ratio is 1:1 and supported formats are
						(.ico, .png or .gif)
					</small>
				</div>
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		favicon: state.forms.settings.data.favicon,
	}),
	{ onDelete: SettingsActions.onImageDelete }
)(FaviconField);
