import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const SideBar = (props) => {
	return (
		<div id="side-bar" className="blur-shadow" data-simplebar>
			<div id="logo">
				<Link to="">
					<img
						alt="MEVid - Admin Control Panel"
						src="/assets/images/panel-logo.png"
					/>
				</Link>
			</div>

			<NavBar />

			<div id="development-rights">
				<span>Designed & Developed BY</span>
				<br />
				<strong>Mustafa Salah</strong>
			</div>
		</div>
	);
};

export default SideBar;
