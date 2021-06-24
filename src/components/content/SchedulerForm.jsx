import React from "react";
import Select from "./../common/form/Select";

const daysMap = new Map([
	["sun", "Sunday"],
	["mon", "Monday"],
	["tue", "Tuesday"],
	["wed", "Wednesday"],
	["thu", "Thursday"],
	["fri", "Friday"],
	["sat", "Saturday"],
]);

const SchedulerForm = ({
	shows,
	data,
	schedulers,
	onShowAdded,
	onShowUpdated,
	onFieldUpdate,
}) => {
	function isFormFilled() {
		const { showId, day, time } = data;
		return showId !== "" && day !== "" && time !== "";
	}

	function handleSubmit(e) {
		// Prevent Default Form Submition Action
		e.preventDefault();

		if (!isFormFilled()) return;

		const { showId, day, time } = data;

		if (data.id === null) {
			onShowAdded(showId, day, time);
		} else {
			onShowUpdated(data.id, day, time);
		}
	}

	return (
		<div className="widget form radius" id="show-scheduler-form">
			<h3>
				<span>
					<i className="fas fa-calendar-plus"></i> Schedule Show
				</span>
			</h3>
			<div className="widget-content radius">
				<form id="scheduler-form" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-4-2">
							<div className="field">
								<label htmlFor="show-name">Select Show</label>
								<Select
									className="select2"
									name="show-name"
									id="show-name"
									value={data.showId}
									options={[
										{
											label: "Select show to schedule",
											value: "",
										},
										...shows.map(({ id, name }) => ({
											label: name,
											value: id,
										})),
									]}
									onChange={(select) => {
										const showId = select.value;
										const showScheduler = schedulers.find(
											(scheduler) =>
												scheduler.showId == showId
										);
										if (showScheduler) {
											onFieldUpdate(
												["id", "showId", "day", "time"],
												showScheduler
											);
										} else {
											onFieldUpdate(
												["id", "showId", "day", "time"],
												{
													id: null,
													showId,
													day: "",
													time: "",
												}
											);
										}
									}}
								/>
							</div>
						</div>
						<div className="col-4-2">
							<div className="row">
								<div className="col-2">
									<div className="field date">
										<label htmlFor="show-day">
											The Day
										</label>
										<Select
											name="show-day"
											id="show-day"
											className="select2"
											value={data.day}
											options={[
												{
													label:
														"Select the show day",
													value: "",
												},
												...[...daysMap].map(
													([value, label]) => ({
														label,
														value,
													})
												),
											]}
											onChange={(select) =>
												onFieldUpdate(
													"day",
													select.value
												)
											}
										/>
									</div>
								</div>
								<div className="col-2">
									<div className="field time">
										<label htmlFor="show-time">
											Show Time
										</label>
										<input
											name="show-time"
											id="show-time"
											type="time"
											value={data.time}
											onChange={({
												currentTarget: input,
											}) =>
												onFieldUpdate(
													"time",
													input.value
												)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="primary-btn more-btn radius focus-shadow"
						disabled={!isFormFilled()}
					>
						{" "}
						Update Scheduler
					</button>
				</form>
			</div>
		</div>
	);
};

export default SchedulerForm;
