import React, { Fragment } from "react";
import { connect } from "react-redux";
import SchedulerActions from "../../actions/SchedulerActions";
import SectionHeader from "../common/SectionHeader";
import SchedulerForm from "./SchedulerForm";
import SchedulerDaySection from "./SchedulerDaySection";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const Scheduler = ({
	onShowAdded,
	onShowUpdated,
	onShowUpdate,
	onShowDeleted,
	onFieldUpdate,
	schedulers,
	shows,
	schedulerForm,
}) => {
	return (
		<Fragment>
			<SectionHeader name="Scheduler" faClass="far fa-calendar-alt" />
			<div id="scheduler-container">
				<SchedulerForm
					onShowAdded={onShowAdded}
					onShowUpdated={onShowUpdated}
					onFieldUpdate={onFieldUpdate}
					schedulers={schedulers}
					shows={shows}
					data={schedulerForm}
				/>
				{days.map((day) => (
					<SchedulerDaySection
						key={day}
						day={day}
						shows={shows}
						schedulers={schedulers.filter(
							({ day: showDay }) => day === showDay
						)}
						onShowDeleted={onShowDeleted}
						onShowUpdate={onShowUpdate}
					/>
				))}
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		...state.schedule,
		shows: state.shows.filter((show) => show.category !== "movie"),
	}),
	SchedulerActions
)(Scheduler);
