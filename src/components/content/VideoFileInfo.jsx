import React, { Fragment } from "react";
import FormField from "../common/form/FormField";
import { getRawTypes, getAudioType } from "./../services/showsInfoServices";

const VideoFileInfo = ({ videoNo, formName }) => {
	const fieldNamePrefix = `${formName}.video_files.${videoNo}`;

	return (
		<Fragment>
			<div className="row">
				<div className="col-4">
					<FormField
						label="Raw Type"
						name={`${fieldNamePrefix}.raw_type`}
						type="select"
						options={getRawTypes()}
						required
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Resolution"
						name={`${fieldNamePrefix}.resolution`}
						type="select"
						options={[
							{ label: "2160P", value: "2160" },
							{ label: "1440P", value: "1440" },
							{ label: "1080P", value: "1080" },
							{ label: "720P", value: "720" },
							{ label: "480P", value: "480" },
							{ label: "360P", value: "360" },
							{ label: "240P", value: "240" },
						]}
						required
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Size"
						name={`${fieldNamePrefix}.size`}
						type="text"
						placeholder="e.g. 1.9GB"
					/>
				</div>
				<div className="col-4">
					<FormField
						label="Audio"
						name={`${fieldNamePrefix}.audio`}
						type="select"
						options={getAudioType()}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-3">
					<FormField
						label="Language"
						name={`${fieldNamePrefix}.language`}
						type="text"
						placeholder="default: English"
					/>
				</div>
				<div className="col-3">
					<FormField
						label="Subtitle"
						name={`${fieldNamePrefix}.subtitle`}
						type="text"
						placeholder="default: none"
					/>
				</div>
				<div className="col-3">
					<FormField
						label="Translator"
						name={`${fieldNamePrefix}.translator`}
						type="text"
						placeholder="default: none"
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default VideoFileInfo;
