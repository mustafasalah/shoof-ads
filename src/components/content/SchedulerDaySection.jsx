import React from "react";
import SchedulerShow from "./SchedulerShow";

const daysMap = {
	sun: "Sunday",
	mon: "Monday",
	tue: "Tuesday",
	wed: "Wednesday",
	thu: "Thursday",
	fri: "Friday",
	sat: "Saturday",
};

const SchedulerDaySection = ({
	schedulers,
	shows,
	day,
	onShowDeleted,
	onShowUpdate,
}) => {
	let isGray = true;

	return (
		<section className="widget form day-shows">
			<h3 className="blur-shadow radius">
				<span>
					<i className="fas fa-calendar-day"></i>
					{" " + daysMap[day]} Shows
				</span>
			</h3>
			<div className="widget-content radius blur-shadow">
				{schedulers.length ? (
					<ul>
						{schedulers.map(({ id, showId, time }, i) => {
							if (i % 3 === 0) isGray = !isGray;
							return (
								<SchedulerShow
									key={id}
									schedulerId={id}
									show={shows.find(
										(show) => show.id === showId
									)}
									time={time}
									isGray={isGray}
									onShowDeleted={onShowDeleted}
									onShowUpdate={onShowUpdate}
								/>
							);
						})}
					</ul>
				) : (
					<p>There are no scheduled shows on this day, yet</p>
				)}
			</div>
		</section>
	);
};

export default SchedulerDaySection;
