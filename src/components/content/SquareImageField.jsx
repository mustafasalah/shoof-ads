import React from "react";
import FormField from "../common/form/FormField";

const SquareImageField = ({ squareImageFile, onDelete }) => {
	const squareUrl = squareImageFile.delete ? "" : squareImageFile.url;

	return (
		<div className="row">
			<div className="col-5-2">
				<span
					id="show-square-image-preview"
					className={`image blur-shadow radius${
						squareUrl ? "" : " empty"
					}`}
					style={
						squareUrl
							? { backgroundImage: `url('${squareUrl}')` }
							: undefined
					}
				></span>
			</div>
			<div className="col-5-3">
				<div className="show-image-uploader">
					{squareImageFile && !squareImageFile.delete ? (
						<button
							type="button"
							className="primary-btn delete-btn radius-3 focus-shadow"
							onClick={() => {
								const reply = window.confirm(
									"Are you sure you want to delete the image?"
								);
								reply && onDelete("square_image");
							}}
						>
							Delete Image
						</button>
					) : (
						<FormField
							type="file"
							name="show.square_image"
							label="Upload"
							labelClass="primary-btn upload-btn radius focus-shadow"
							accept="image/*"
							unwrappedField
							labelAfter
						/>
					)}
				</div>
				<p className="note radius">
					{squareImageFile && !squareImageFile.delete
						? `${squareImageFile.name} / ${(squareImageFile.size /
								1e6,
						  2).toFixed(2)}MB`
						: `image shown in recent added and today's schedule.`}
				</p>
			</div>
		</div>
	);
};

export default SquareImageField;
