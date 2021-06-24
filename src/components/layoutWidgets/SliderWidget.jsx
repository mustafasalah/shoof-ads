import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { getGenresOptions } from "./../services/getGenres";
import { connect } from "react-redux";

const SliderWidget = ({ siteContent, onSubmit }) => (
	<FormSideSection
		label="Shows Slider"
		id="shows-slider"
		submitBtn={onSubmit}
	>
		<div className="row">
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
				<FormField
					name="layout.settings.genres"
					label="Genres"
					type="select"
					options={getGenresOptions}
					placeholder="Default: All"
					multiple
				/>
			</div>

			<div className="col-1">
				<TagsField
					name="layout.settings.tag"
					label="Tags"
					type="select"
					placeholder="Press 'enter' after any tag you write"
					multiple
					tags
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
					name="layout.settings.order"
					label="Order By"
					type="select"
					options={[
						{
							label: "Latest",
							value: "latest",
						},
						{
							label: "Oldest",
							value: "oldest",
						},
						{
							label: "Most Viewed",
							value: "views",
						},
						{
							label: "Top Rated",
							value: "rates",
						},
					]}
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.shows_no"
					label="Shows No"
					type="number"
					min="4"
					placeholder="default: 8"
				/>
			</div>

			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>
							Enable or Disable Show Slider from Home Page
						</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default connect((state) => ({
	siteContent: state.forms.settings.data.site_content,
}))(SliderWidget);
