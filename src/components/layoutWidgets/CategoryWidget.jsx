import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { connect } from "react-redux";

const CategoryWidget = ({ siteContent, onSubmit, onDelete }) => (
	<FormSideSection
		label="Category of Shows"
		id="category"
		submitBtn={onSubmit}
		deleteBtn={onDelete}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Category of Shows"
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.category"
					label="Category"
					type="select"
					placeholder="Default: All Categories"
					options={siteContent.map((content) => {
						if (content === "movies") {
							return {
								label: "Movie",
								value: "movie",
							};
						} else if (content === "tvshows") {
							return {
								label: "TV Show",
								value: "tvshow",
							};
						} else {
							return {
								label: "Anime",
								value: "anime",
							};
						}
					})}
					multiple
				/>
			</div>

			<div className="col-1">
				<TagsField
					name="layout.settings.tag"
					label="Tag"
					type="select"
					placeholder="Default: No Tag"
					htmlAfterField={
						<small>
							Used to group collection of shows together under
							certain name
						</small>
					}
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.shows_no"
					label="Shows No"
					type="number"
					placeholder="default: 6"
					min="3"
					step="3"
				/>
			</div>
		</div>
	</FormSideSection>
);

export default connect((state) => ({
	siteContent: state.forms.settings.data.site_content,
}))(CategoryWidget);
