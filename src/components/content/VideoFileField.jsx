import React from "react";
import VideoFileInfo from "./VideoFileInfo";
import VideoFileDownload from "./VideoFileDownload";
import AddMoreBtn from "./AddMoreBtn";
import { connect } from "react-redux";
import * as mediaFormActions from "./../../actions/MediaFormActions";

const VideoFileField = ({
	videoNo,
	formName,
	forms,
	handleVideoFileDelete,
	handleVideoInfoDelete,
	handleVideoLinkDelete,
}) => {
	if (forms[formName].data.video_files[videoNo].delete) return null;

	return (
		<div className="row radius">
			<button
				title="Delete this video"
				type="button"
				className="close-btn delete-server-btn radius-3"
				onClick={(e) => {
					e.preventDefault();
					const reply = window.confirm(
						"Are you sure you want to delete this video?"
					);
					reply && handleVideoInfoDelete(formName, videoNo);
				}}
			></button>

			<div className="col-1">
				<VideoFileInfo videoNo={videoNo} formName={formName} />

				{forms[formName].data.video_files[videoNo].download_servers.map(
					(server, i) => (
						<VideoFileDownload
							key={i}
							formName={formName}
							serverNo={i}
							videoNo={videoNo}
							isUpload={i === 0}
							videoFile={server.file || undefined}
							server={server}
							onVideoFileDelete={handleVideoFileDelete}
							onVideoLinkDelete={handleVideoLinkDelete}
						/>
					)
				)}

				<AddMoreBtn
					label="More Links"
					formName={formName}
					listName={`video_files.${videoNo}.download_servers`}
				/>
			</div>
		</div>
	);
};

export default connect(
	(state) => ({
		forms: state.forms,
	}),
	{
		handleVideoFileDelete: mediaFormActions.onVideoFileDelete,
		handleVideoLinkDelete: mediaFormActions.onVideoLinkDelete,
		handleVideoInfoDelete: mediaFormActions.onVideoInfoDelete,
	}
)(VideoFileField);
