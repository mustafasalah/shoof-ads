import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getPages from "../services/pagesServices";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Pages extends AbstractTablePage {
	tableId = "pages-table";

	tableColumns = [
		{
			dataProp: "title",
			label: "Page Title",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			externalLink: true,
			href: `${HOSTNAME}/pages/:id`,
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: `${HOSTNAME}/pages/:id`,
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/pages/:id",
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-page-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this page?"
						);
						isDelete && this.props.deleteData(id);
					},
				},
			],
		},
		{
			dataProp: "author",
			label: "Author",
			classNames: "more-padding",
			haveSort: true,
			type: "custom",
			render: ({ author, authorId }) => (
				<a href={`${HOSTNAME}/user/${authorId}`}>{author}</a>
			),
		},
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{
			dataProp: "publishDate",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "views",
			label: "Views",
			haveSort: true,
			type: "text",
		},
	];

	filtersData = {
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

	sectionHeader = (
		<SectionHeader
			name="Pages"
			faClass="fas fa-copy"
			link={{ label: "New Page", href: "/pages/new" }}
		/>
	);

	constructor(props) {
		super(props);
		this.getData = getPages;
	}

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure to delete the selected pages?"
		);
		isDelete && this.props.deleteData(this.props.selectedItems);
	}

	handleStatusChange(status) {
		this.props.changeStatus(this.props.selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.pages,
	items: state.pages,
});

const mapDispatchToProps = {
	...getTableActions("pages"),
	...getDataActions("pages"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
