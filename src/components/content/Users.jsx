import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getUsers from "./../services/usersServices";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Users extends AbstractTablePage {
	tableId = "users-table";

	tableColumns = [
		{
			dataProp: "profileImage",
			label: "Avatar",
			haveSort: false,
			type: "custom",
			render: (rowData) => (
				<span
					className="avatar focus-shadow"
					style={{
						backgroundImage: `url('${rowData.profileImage}')`,
					}}
				></span>
			),
		},
		{
			dataProp: "username",
			label: "Username",
			haveSort: true,
			classNames: "primary-col",
			type: "link",
			externalLink: true,
			href: `${HOSTNAME}/user/:id`,
			linksNav: [
				{
					label: "View",
					className: "view-item",
					href: `${HOSTNAME}/user/:id`,
					absolute: true,
				},
				{
					label: "Edit",
					className: "edit-item",
					href: "/users/:id",
				},
				{
					label: "Activate",
					href: "#activate-user-:id",
					on: ({ status }) => status !== "active",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "active");
					},
				},
				{
					label: "Ban",
					href: "#ban-user-:id",
					on: ({ status }) => status === "active",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "ban");
					},
				},
			],
		},
		{
			dataProp: "email",
			label: "Email",
			haveSort: true,
			type: "text",
		},
		{
			dataProp: "name",
			label: "Name",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "role", label: "Role", haveSort: true, type: "text" },
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
		{ dataProp: "showsNo", label: "Shows", haveSort: true, type: "text" },
	];

	filtersData = {
		status: ["active", "banned"],
		role: ["admin", "supervisor", "user"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
		},
		{
			value: "active",
			label: "Active",
			handler: this.handleStatusChange.bind(this, "active"),
		},
		{
			value: "ban",
			label: "Ban",
			handler: this.handleStatusChange.bind(this, "ban"),
		},
	];

	sectionHeader = (
		<SectionHeader
			name="Users"
			faClass="fas fa-users"
			link={{ href: "/users/new", label: "New User" }}
		/>
	);

	constructor(props) {
		super(props);
		this.getData = getUsers;
	}

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure to delete the selected users?"
		);
		isDelete && this.props.deleteData(this.props.selectedItems);
	}

	handleStatusChange(status) {
		this.props.changeStatus(this.props.selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.users,
	items: state.users,
});

const mapDispatchToProps = {
	...getTableActions("users"),
	...getDataActions("users"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
