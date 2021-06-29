import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteNotification } from "../actions/NotificationsActions";
import { upperFirst } from "../js/Utility";

const countNotifications = (notifications) => {
	let counter = 0;

	notifications.forEach((notification) => {
		counter += +notification.counter;
	});
	return counter;
};

const Notification = ({
	active,
	onClick,
	notifications,
	deleteNotification,
}) => {
	const notificationsCount = countNotifications(notifications);

	const getNotificationMessage = (notification) => {
		if (notification.episode_id) {
			const { showName, episodeNo, episodeTitle } = notification;
			return `${showName} - Ad ${episodeNo}${
				episodeTitle ? `: ${episodeTitle}` : ""
			}`;
		} else {
			return notification.showName;
		}
	};

	return (
		<div className="top-bar-btn" id="notify-btn" title="notification panel">
			<button
				className={active ? "active" : ""}
				onClick={(e) => {
					e.preventDefault();
					onClick(active ? "" : "notification");
				}}
			>
				<i className="fas fa-bell">
					{notificationsCount ? (
						<span className="counter">{notificationsCount}</span>
					) : (
						""
					)}
				</i>
			</button>
			<ul className="sub-menu blur-shadow">
				{notifications.length !== 0 ? (
					notifications.map((notification) => {
						return (
							<li key={notification.id}>
								<Link
									to={`/${notification.type}s`}
									onClick={() =>
										deleteNotification(notification.id)
									}
								>
									<span
										className={`notify-label ${notification.type}`}
									>
										{`${
											notification.is_new === "1"
												? "New"
												: "Edited"
										} ${upperFirst(notification.type)}`}
									</span>
									<span className="counter">
										{notification.counter}
									</span>
									<p>
										{getNotificationMessage(notification)}
									</p>
								</Link>
							</li>
						);
					})
				) : (
					<p className="no-notifications">
						There are no new notifications yet
					</p>
				)}
			</ul>
		</div>
	);
};

export default connect(
	(state) => ({
		notifications: state.notifications,
	}),
	{
		deleteNotification,
	}
)(Notification);
