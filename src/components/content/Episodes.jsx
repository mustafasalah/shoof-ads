import React, { Fragment } from "react";
import { connect } from "react-redux";
import getAuthors from "../services/authorsServices.js";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Episodes extends AbstractTablePage {
	tableId = "episodes-table";

	tableColumns = [
		{
			dataProp: "showName",
			label: "Episode Info",
			haveSort: true,
			classNames: "primary-col",
			type: "custom",
			render: (rowData, renderLinksNav) => (
				<Fragment>
					<span
						className="poster radius focus-shadow"
						style={{
							backgroundImage: `url('${rowData.poster}')`,
						}}
					></span>
					<div className="episode">
						<dl className="episode-info">
							<dt>Episode No:</dt>
							<dd>
								<a
									href={`${HOSTNAME}/shows/${rowData.showId}/episodes/${rowData.episodeNo}`}
									target="_blank"
									rel="noreferrer"
								>
									{`Episode ${rowData.episodeNo
										.toString()
										.padStart(2, "0")}` +
										(rowData.episodeTitle
											? `: ${rowData.episodeTitle}`
											: "")}
								</a>
							</dd>

							<dt>Show Name:</dt>
							<dd>
								<a
									href={`${HOSTNAME}/shows/${rowData.showId}`}
									target="_blank"
									rel="noreferrer"
								>
									{rowData.showName}
								</a>
							</dd>
						</dl>
						{renderLinksNav()}
					</div>
				</Fragment>
			),
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: `${HOSTNAME}/shows/:showId/episodes/:episodeNo`,
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/episodes/:id",
					permission: "supervisor",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this episode?"
						);
						isDelete && this.props.deleteData(id);
					},
					permission: "supervisor",
				},
			],
		},
		{
			dataProp: "category",
			label: "Category",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "author",
			label: "Author",
			haveSort: true,
			type: "custom",
			render: ({ author, authorId }) => (
				<a href={`${HOSTNAME}/user/${authorId}`}>{author}</a>
			),
		},
		{
			dataProp: "comments",
			label: "Comments",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{
			dataProp: "publishDate",
			label: "Publish date",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "views", label: "Views", haveSort: true, type: "text" },
	];

	filtersData = {
		category: ["tvshow", "anime"],
		author: getAuthors().map((author) => author.name),
		status: ["published", "drafted"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
			permission: "supervisor",
		},
		{
			value: "draft",
			label: "Make a draft",
			handler: this.handleStatusChange.bind(this, "draft"),
		},
		{
			value: "publish",
			label: "Publish",
			handler: this.handleStatusChange.bind(this, "publish"),
		},
	];

	sectionHeader = (
		<SectionHeader
			name="Episodes"
			link={{ href: "/episodes/add", label: "New Episode" }}
		/>
	);

	handleDelete() {
		const deleteEpisodes = window.confirm(
			"Are you sure to delete the selected shows?"
		);
		const selectedItems = this.authorizeActionOnSelectedItems();
		deleteEpisodes && this.props.deleteData(selectedItems);
	}

	handleStatusChange(status) {
		const selectedItems = this.authorizeActionOnSelectedItems();
		this.props.changeStatus(selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.episodes,
	items: state.episodes,
	loggedUser: state.loggedUser,
	settings: state.forms.settings.data,
});

const mapDispatchToProps = {
	...getTableActions("episodes"),
	...getDataActions("episodes"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
