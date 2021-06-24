import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import { authorize } from "./../../js/Utility";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Comments extends AbstractTablePage {
	tableId = "comments-table";

	tableColumns = [
		{
			dataProp: "author",
			label: "Author",
			haveSort: true,
			classNames: "more-padding primary-col",
			type: "link",
			externalLink: true,
			href: `${HOSTNAME}/user/:authorId`,
		},
		{
			dataProp: "content",
			label: "Comment",
			classNames: "align-start",
			haveSort: false,
			type: "text",
			linksNav: [
				{
					label: "Approve",
					className: "approve-item",
					href: "#approve-comment-:id",
					on: ({ status }) => status !== "approved",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "approve");
					},
					permission: "supervisor",
					customAuthorize: this.customAuthorize.bind(this),
				},
				{
					label: "Unapprove",
					className: "unapprove-item",
					href: "#unapprove-comment-:id",
					on: ({ status }) => status === "approved",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "unapprove");
					},
					permission: "supervisor",
					customAuthorize: this.customAuthorize.bind(this),
				},
				{
					label: "Reply",
					className: "reply-item",
					href: `${HOSTNAME}/shows/:showId/episodes/:episodeNo#comments`,
					absolute: true,
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-comment-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this comment?"
						);
						isDelete && this.props.deleteData(id);
					},
					permission: "supervisor",
					customAuthorize: this.customAuthorize.bind(this),
				},
			],
		},
		{
			dataProp: "episodeNo",
			label: "Response to",
			classNames: "align-start",
			haveSort: false,
			type: "custom",
			render: (rowData) => (
				<Fragment>
					<p>
						{rowData.replyAuthorId && (
							<Fragment>
								<a
									href={`${HOSTNAME}/user/${rowData.replyAuthorId}`}
									target="_blank"
									rel="noreferrer"
								>
									{
										this.props.authors.find(
											(author) =>
												author.id ==
												rowData.replyAuthorId
										).username
									}
								</a>
								<i> Comments on:</i>
								<br />
							</Fragment>
						)}
						<a
							className={rowData.replyAuthorId ? "mg-top" : ""}
							href={`${HOSTNAME}/shows/${rowData.showId}/episodes/${rowData.episodeNo}`}
							target="_blank"
							rel="noreferrer"
						>
							Episode
							{` ${rowData.episodeNo
								.toString()
								.padStart(2, "0")}: ${rowData.showName}`}
						</a>
					</p>
				</Fragment>
			),
		},
		{
			dataProp: "publishDate",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
		{ dataProp: "status", label: "Status", haveSort: true, type: "text" },
	];

	filtersData = {
		status: ["approved", "unapproved"],
	};

	actions = [
		{
			value: "delete",
			label: "Delete",
			handler: this.handleDelete.bind(this),
		},
		{
			value: "approve",
			label: "Approve",
			handler: this.handleStatusChange.bind(this, "approve"),
		},
		{
			value: "unapprove",
			label: "Unapprove",
			handler: this.handleStatusChange.bind(this, "unapprove"),
		},
	];

	sectionHeader = (
		<SectionHeader name="Comments" faClass="fas fa-comments" />
	);

	customAuthorize(comment) {
		const episodeOfComment = this.getEpisodeOfComment(comment);
		return episodeOfComment.authorId === this.props.loggedUser.id;
	}

	getEpisodeOfComment(comment) {
		const { episodes } = this.props;
		return episodes.find((ep) => ep.id === comment.episodeId);
	}

	authorizeActionOnSelectedItems() {
		let { selectedItems, items, loggedUser } = this.props;

		// filter the selectItem if the logged user is authorized to the action
		// with all selected items only his own items
		if (authorize(loggedUser.role, "supervisor") === false) {
			selectedItems = selectedItems.filter((id) => {
				const selectedComment = items.find((item) => item.id === id);
				const episodeOfComment =
					this.getEpisodeOfComment(selectedComment);

				if (episodeOfComment.authorId === loggedUser.id) return true;

				return false;
			});
		}

		return selectedItems;
	}

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure to delete the selected comments?"
		);
		const selectedItems = this.authorizeActionOnSelectedItems();
		isDelete && this.props.deleteData(selectedItems);
	}

	handleStatusChange(status) {
		const selectedItems = this.authorizeActionOnSelectedItems();
		this.props.changeStatus(selectedItems, status);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.comments,
	items: state.comments,
	authors: state.users,
	episodes: state.episodes,
	loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
	...getTableActions("comments"),
	...getDataActions("comments"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
