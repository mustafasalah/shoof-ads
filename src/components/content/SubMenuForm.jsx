import React from "react";
import FormField from "../common/form/FormField";
import TagsField from "./TagsField";
import { connect } from "react-redux";
import { genresUrlOptions } from "../services/getGenres";
import mainMenuActions from "./../../actions/MainMenuActions";

const subMenuForm = ({ form, siteContent, pages, onSubmit }) => {
	const { id, label, url } = form;
	const isUpdate = id !== "";
	const isFilled = label !== "" && url !== "";

	const linkField = () => {
		switch (form.type) {
			case "link":
				return (
					<FormField
						name="submenu.link"
						label="URL"
						type="url"
						placeholder="e.g. /scheduler"
					/>
				);

			case "page":
				return (
					<FormField
						name="submenu.link"
						label="Page"
						type="select"
						options={pages.map((page) => ({
							label: page.title,
							value: `/page/${window.encodeURIComponent(
								page.title
							)}`,
						}))}
						placeholder="Select page..."
					/>
				);

			case "category":
				return (
					<FormField
						name="submenu.link"
						label="Category"
						type="select"
						options={siteContent.map((content) => {
							let label;
							if (content === "movies") {
								label = "Movies";
							} else if (content === "tvshows") {
								label = "TV Shows";
							} else {
								label = "Anime";
							}
							return {
								label,
								value: `/${content}`,
							};
						})}
						placeholder="Select category..."
					/>
				);

			case "genre":
				return (
					<FormField
						name="submenu.link"
						label="Genre"
						type="select"
						options={genresUrlOptions}
						placeholder="Select genre..."
					/>
				);

			case "tag":
				return (
					<TagsField
						name="submenu.link"
						label="Tags"
						type="select"
						tagValuePrefix="/tag/"
						urlEncodeValue
						placeholder="Select tag..."
					/>
				);

			default:
				return;
		}
	};

	return (
		<div className="field">
			<label htmlFor="link-name">
				{isUpdate ? "Update" : "Add"} SubMenu Item
			</label>
			<div className="row radius" id="nested-form">
				<div className="col-1">
					<FormField
						name="submenu.label"
						label="Link Label"
						type="text"
					/>
				</div>

				<div className="col-1">
					<FormField
						name="submenu.type"
						label="Link Type"
						type="select"
						options={[
							{ label: "Custom Link", value: "link" },
							{
								label: "Category",
								value: "category",
							},
							{ label: "Genre", value: "genre" },
							{ label: "Page", value: "page" },
							{ label: "Tag", value: "tag" },
						]}
					/>
				</div>

				<div className="col-1">{linkField()}</div>
				<button
					type="button"
					id="links-list-button"
					className="dark-btn radius-3 focus-shadow"
					disabled={!isFilled}
					onClick={() => isFilled && onSubmit(form)}
				>
					{isUpdate ? "Update" : "Add"} Link
				</button>
			</div>
		</div>
	);
};

export default connect(
	(state) => ({
		pages: state.pages,
		form: state.forms.submenu.data,
		siteContent: state.forms.settings.data.site_content,
	}),
	{
		onSubmit: mainMenuActions.submitMenuItem,
	}
)(subMenuForm);
