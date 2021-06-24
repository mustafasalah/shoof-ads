import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "./../common/SectionHeader";
import getReviews from "./../services/reviewsServices";
import { authorize } from "./../../js/Utility";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Reviews extends AbstractTablePage {
	tableId = "reviews-table";

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
			label: "Review",
			classNames: "align-start",
			haveSort: false,
			type: "text",
			render: ({ title }) => {
				return <h4>{title}</h4>;
			},
			linksNav: [
				{
					label: "Approve",
					className: "approve-item",
					href: "#approve-review-:id",
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
					href: "#unapprove-review-:id",
					on: ({ status }) => status === "approved",
					onClick: ({ id }) => {
						this.props.changeStatus([id], "unapprove");
					},
					permission: "supervisor",
					customAuthorize: this.customAuthorize.bind(this),
				},
				{
					label: "Delete",
					className: "delete-item",
					href: "#delete-review-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure to delete this review?"
						);
						isDelete && this.props.deleteData(id);
					},
					permission: "supervisor",
					customAuthorize: this.customAuthorize.bind(this),
				},
			],
		},
		{
			dataProp: "rate",
			label: "Rate",
			haveSort: true,
			type: "custom",
			render: (rowData) => (
				<Fragment>
					<span title={`${rowData.rate} of 5`} className="rating">
						{[0, 0, 0, 0, 0]
							.fill(1, 0, rowData.rate)
							.map((isfilledStar) => (
								<i
									className={`${
										isfilledStar ? "fas" : "far"
									} fa-star`}
								></i>
							))}
					</span>
				</Fragment>
			),
		},
		{
			dataProp: "showName",
			label: "Show",
			haveSort: true,
			classNames: "align-start primary-col",
			type: "custom",
			render: ({ showName, showId }) => (
				<a
					href={`${HOSTNAME}/shows/${showId}`}
					target="_blank"
					rel="noreferrer"
				>
					{showName}
				</a>
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
		rate: [1, 2, 3, 4, 5],
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
		<SectionHeader name="Reviews" faClass="fas fa-star-half-alt" />
	);

	constructor(props) {
		super(props);
		this.getData = getReviews;
	}

	customAuthorize(review) {
		const showOfReview = this.getShowOfReview(review);
		return showOfReview.authorId === this.props.loggedUser.id;
	}

	getShowOfReview(review) {
		const { shows } = this.props;
		return shows.find((show) => show.id === review.showId);
	}

	authorizeActionOnSelectedItems() {
		let { selectedItems, items, loggedUser } = this.props;

		// filter the selectItem if the logged user is authorized to the action
		// with all selected items only his own items
		if (authorize(loggedUser.role, "supervisor") === false) {
			selectedItems = selectedItems.filter((id) => {
				const selectedReview = items.find((item) => item.id === id);
				const showOfReview = this.getShowOfReview(selectedReview);

				return showOfReview.authorId === loggedUser.id;
			});
		}

		return selectedItems;
	}

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure to delete the selected reviews?"
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
	...state.tables.reviews,
	items: state.reviews,
	shows: state.shows,
	loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
	...getTableActions("reviews"),
	...getDataActions("reviews"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
