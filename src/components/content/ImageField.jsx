import React from "react";

const ImageField = ({ imageNo }) => {
	return (
		<div className="row radius">
			<label htmlFor={`image-url-${imageNo}`}>Image {imageNo}</label>
			<label
				htmlFor={`image-upload-${imageNo}`}
				className="primary-btn upload-btn focus-shadow radius-3"
			>
				Upload Image
			</label>
			<input
				id={`image-upload-${imageNo}`}
				name="image1"
				type="file"
				accept="image/*"
			/>
			<span>OR</span>
			<input
				id={`image-url-${imageNo}`}
				placeholder="Image url here..."
				name={`image-url-${imageNo}`}
				type="url"
			/>
		</div>
	);
};

export default ImageField;
