import React from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";

const GalleryImages = ({ images, showName, dispatch }) => {
	return images.length ? (
		<div id="gallery-images-conatiner" className="radius">
			<h4>Uploaded Gallery Images</h4>
			<div id="gallery-images">
				{images.map((img, i) => (
					<div key={i} className="image-wrapper">
						<img
							className="focus-shadow radius-3"
							alt={showName}
							title={`${showName} - Image ${i + 1}`}
							src={img.url}
						/>
						<button
							title="delete image"
							type="button"
							onClick={() => {
								const reply = window.confirm(
									"Are you sure you want to delete the image?"
								);
								reply &&
									dispatch({
										type: ACTIONS.DELETE_GALLERY_IMAGE,
										imageIndex: i,
									});
							}}
							className="delete-btn primary-btn radius-3 focus-shadow"
						></button>
					</div>
				))}
			</div>
		</div>
	) : null;
};

export default connect()(GalleryImages);
