import React from "react";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const SchedulerShow = ({
	schedulerId,
	show,
	time,
	isGray,
	onShowDeleted,
	onShowUpdate,
}) => {
	if (show === undefined) return null;

	return (
		<li className={isGray ? "gray" : ""}>
			<div className="show-poster">
				<a
					href={`/shows/${show.id}`}
					className="focus-shadow radius"
					style={{ backgroundImage: `url('${show.poster}')` }}
					title={show.name}
				></a>
			</div>
			<div className="show-info">
				<dl>
					<dt>Show Name:</dt>
					<dd>
						<a
							href={`${HOSTNAME}/shows/${show.id}`}
							target="_blank"
							rel="noreferrer"
						>
							{show.name}
						</a>
					</dd>

					<dt>Show Time:</dt>
					<dd>
						<time dateTime={time}>{time} GMT</time>
					</dd>
				</dl>
				<div className="day-show-actions">
					<button
						onClick={() =>
							window.confirm(
								"Are you sure to delete this show from the scheduler?"
							) && onShowDeleted(schedulerId)
						}
						className="dark-btn focus-shadow radius-3"
					>
						Remove
					</button>
					<button
						onClick={() => {
							window.scrollTo(0, 0);
							onShowUpdate(schedulerId);
						}}
						className="primary-btn focus-shadow radius-3"
					>
						Update
					</button>
				</div>
			</div>
		</li>
	);
};

export default SchedulerShow;
