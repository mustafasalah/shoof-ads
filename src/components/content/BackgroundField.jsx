import React from "react";
import FormField from "./../common/form/FormField";

const BackgroundField = ({ backgroundFile }) => {
	const backgroundUrl = backgroundFile.url;

	return (
		<div className="row">
			<div className="col-1">
				<span
					id="show-background-preview"
					className={`image blur-shadow radius${
						backgroundUrl ? "" : " empty"
					}`}
					style={
						backgroundUrl
							? { backgroundImage: `url('${backgroundUrl}')` }
							: undefined
					}
				></span>
			</div>
			<div className="col-1">
				<div className="show-image-uploader">
					<FormField
						type="file"
						name="show.background"
						label="Upload Background"
						labelClass="primary-btn upload-btn radius focus-shadow"
						accept="image/*"
						unwrappedField
						labelAfter
					/>
				</div>
				<p
					className="note radius"
					style={{ marginLeft: "40px", marginRight: "40px" }}
				>
					{
						(console.log(backgroundFile),
						backgroundFile
							? `${backgroundFile.name} / ${(
									backgroundFile.size / 1e6
							  ).toFixed(2)}MB`
							: `An image that is displayed as background on the show
						page and watch page, ensuring that it is of high quality
						and its width is greater than its height.`)
					}
				</p>
			</div>
		</div>
	);
};

export default BackgroundField;
