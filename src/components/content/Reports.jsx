import React, { Fragment } from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractTablePage from "../common/AbstractTablePage";
import SectionHeader from "../common/SectionHeader";
import { authorize } from "./../../js/Utility";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

class Reports extends AbstractTablePage {
	tableId = "reports-table";

	tableColumns = [
		{
			dataProp: "show_id",
			label: "Report on",
			classNames: "primary-col",
			haveSort: false,
			type: "custom",
			render: ({ showId, episodeNo, showName }, renderLinksNav) => {
				return (
					<Fragment>
						<a
							href={`${HOSTNAME}/shows/${showId}${
								episodeNo ? "/episodes/" + episodeNo : ""
							}`}
							target="_blank"
							rel="noreferrer"
						>
							{`${showName}${
								episodeNo
									? " - Episode " +
									  episodeNo.toString().padStart(2, "0")
									: ""
							}`}
						</a>
						{renderLinksNav()}
					</Fragment>
				);
			},
			linksNav: [
				{
					label: "Fix",
					className: "fix-item",
					href: "#fix-report-:id",
					onClick: ({ id }) => {
						const isDelete = window.confirm(
							"Are you sure you fixed this report?"
						);
						isDelete && this.props.deleteData(id);
					},
					permission: "supervisor",
					customAuthorize: (report) => {
						return (
							this.getReportOn(report).authorId ===
							this.props.loggedUser.id
						);
					},
				},
			],
		},
		{
			dataProp: "description",
			label: "Description",
			classNames: "more-padding",
			haveSort: false,
			type: "text",
			default: "No description provided",
		},
		{
			dataProp: "date",
			label: "Submitted On",
			haveSort: true,
			type: "text",
		},
	];

	actions = [
		{
			value: "fix",
			label: "Fix",
			handler: this.handleDelete.bind(this),
		},
	];

	sectionHeader = (<SectionHeader name="Reports" faClass="fas fa-bug" />);

	getReportOn(report) {
		const { episodes, shows } = this.props;
		if (report.episodeNo) {
			return episodes.find(
				(ep) =>
					ep.episodeNo === report.episodeNo &&
					ep.showId === report.showId
			);
		} else {
			return shows.find((show) => show.id === report.showId);
		}
	}

	authorizeActionOnSelectedItems() {
		let { selectedItems, items, loggedUser } = this.props;

		// filter the selectItem if the logged user is authorized to the action
		// with all selected items only his own items
		if (authorize(loggedUser.role, "supervisor") === false) {
			selectedItems = selectedItems.filter((id) => {
				const selectedReport = items.find((item) => item.id === id);
				const reportOn = this.getReportOn(selectedReport);

				if (reportOn.authorId === loggedUser.id) return true;

				return false;
			});
		}

		return selectedItems;
	}

	handleDelete() {
		const isDelete = window.confirm(
			"Are you sure you have fixed the selected reports?"
		);
		const selectedItems = this.authorizeActionOnSelectedItems();
		isDelete && this.props.deleteData(selectedItems);
	}
}

const mapStateToProps = (state) => ({
	...state.tables.reports,
	items: state.reports,
	episodes: state.episodes,
	shows: state.shows,
	loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
	...getTableActions("reports"),
	...getDataActions("reports"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
