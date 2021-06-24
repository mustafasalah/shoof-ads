import React from "react";
import FormField from "../common/form/FormField";
import * as mediaFormActions from "./../../actions/MediaFormActions";
import { connect } from "react-redux";

const ServerField = ({
	serverNo,
	formName,
	value,
	handleFileDelete,
	handlePlayerDelete,
}) => {
	return (
		<div className="row">
			<div className="col-5-2">
				<FormField
					label="Server Name"
					name={`${formName}.watching_servers.${serverNo}.name`}
					type="text"
					placeholder="e.g. MEVid Server"
				/>
			</div>

			<div className="col-5-3">
				{serverNo === 0 ? (
					<div className="row">
						{["2160P", "1080P", "720P", "480P", "360P", "240P"].map(
							(res) => (
								<div key={res} className="col-3">
									<FormField
										label="Resolution"
										type="text"
										defaultValue={res}
										placeholder="e.g. MEVid Server"
										disabled
										htmlAfterField={
											value.files[res] &&
											!value.files[res].delete ? (
												<button
													type="button"
													className="primary-btn upload-btn delete-btn focus-shadow radius-3"
													onClick={() => {
														const reply = window.confirm(
															"Are you sure you want to delete the video file?"
														);
														reply &&
															handleFileDelete(
																formName,
																res
															);
													}}
												></button>
											) : (
												<FormField
													label=" "
													name={`${formName}.watching_servers.0.files.${res}`}
													labelClass="primary-btn upload-btn focus-shadow radius-3"
													type="file"
													unwrappedField
												/>
											)
										}
									/>
								</div>
							)
						)}
					</div>
				) : (
					<FormField
						label="Player Code"
						name={`${formName}.watching_servers.${serverNo}.code`}
						type="textarea"
						placeholder="iframe, embed or video tag"
					/>
				)}
			</div>
			{serverNo !== 0 && (
				<button
					title="Delete this video player code"
					type="button"
					className="close-btn delete-server-btn radius-3"
					onClick={(e) => {
						e.preventDefault();
						const reply = window.confirm(
							"Are you sure you want to delete this video player code?"
						);
						reply && handlePlayerDelete(formName, serverNo);
					}}
				></button>
			)}
		</div>
	);
};

export default connect(null, {
	handleFileDelete: mediaFormActions.onWatchVideoFileDelete,
	handlePlayerDelete: mediaFormActions.onWatchVideoPlayerDelete,
})(ServerField);
