import React from "react";
import getAuthors from "../services/authorsServices";
import AbstractTablePage from "./AbstractTablePage";
import getGenres from "./../services/getGenres";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class AbstractShows extends AbstractTablePage {
	tableColumns = [
		{
			dataProp: "poster",
			label: "Poster",
			haveSort: false,
			type: "img",
			alt: ":name",
		},
		{
			dataProp: "name",
			label: "Playlist Name",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			href: `${HOSTNAME}/shows/:id`,
			externalLink: true,
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: `${HOSTNAME}/shows/:id`,
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/shows/:id",
					permission: "supervisor",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this playlist?"
						);
						isDelete && this.props.deleteData(id);
					},
					permission: "supervisor",
				},
			],
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
		{ dataProp: "reviews", label: "Reviews", haveSort: true, type: "text" },
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
		genres: getGenres(this.constructor.name),
		author: getAuthors().map((author) => author.name),
		status: ["published", "drafted"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
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

	componentWillUpdate() {
		this.filtersData.author = getAuthors().map((author) => author.name);
	}

	handleDelete() {
		const deleteShows = window.confirm(
			"Are you sure to delete the selected playlists?"
		);
		const selectedItems = this.authorizeActionOnSelectedItems();
		deleteShows && this.props.deleteData(selectedItems);
	}

	handleStatusChange(status) {
		const selectedItems = this.authorizeActionOnSelectedItems();
		this.props.changeStatus(selectedItems, status);
	}
}

export default AbstractShows;
