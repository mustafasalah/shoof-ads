import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import TagsField from "./../content/TagsField";
import { getGenresOptions } from "./../services/getGenres";
import IconsFormField from "./IconsFormField";

const PickedShowsWidget = ({ onSubmit, onDelete }) => (
	<FormSideSection
		label="Picked Shows"
		id="selected-shows"
		submitBtn={onSubmit}
		deleteBtn={onDelete}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Picked Shows"
				/>
			</div>

			<div className="col-1">
				<IconsFormField />
			</div>

			<div className="col-1">
				<FormField
					name="layout.settings.category"
					label="Category"
					type="select"
					options={[
						{
							label: "Movie",
							value: "movie",
						},
						{ label: "Anime", value: "anime" },
						{
							label: "TV Show",
							value: "tvshow",
						},
					]}
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
					min="2"
					placeholder="default: 8"
				/>
			</div>
		</div>
	</FormSideSection>
);

export default PickedShowsWidget;
