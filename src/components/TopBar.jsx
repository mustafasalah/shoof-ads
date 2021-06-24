import React, { useState } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import UserProfile from "./UserProfile";
import Notification from "./Notification";
import AddMenu from "./AddMenu";

const TopBar = ({ user, siteContent }) => {
	const [activeBtn, setActiveBtn] = useState("");

	return (
		<div id="top-bar">
			<div id="inner-wrapper" className="blur-shadow">
				<Route component={TopNavigation} />
				<div id="admin-btns">
					<AddMenu
						loggedUser={user}
						siteContent={siteContent}
						active={activeBtn === "addMenu"}
						onClick={setActiveBtn}
					/>
					<Notification
						active={activeBtn === "notification"}
						onClick={setActiveBtn}
					/>
					<UserProfile
						user={user}
						active={activeBtn === "userProfile"}
						onClick={setActiveBtn}
					/>
				</div>
			</div>
		</div>
	);
};

export default TopBar;
