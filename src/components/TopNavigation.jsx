import React from "react";
import { Link } from "react-router-dom";

const TopNavigation = ({ location }) => {
	const navItems = location.pathname
		.split("/")
		.slice(1)
		.map((item) =>
			item
				.split("-")
				.map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
				.join(" ")
		);

	return (
		<ol id="navigation">
			<li>
				<i className="fas fa-home"></i>{" "}
				<a href="/" target="_blank" rel="noreferrer">
					Home
				</a>
			</li>

			{navItems.map((item, i) => (
				<li key={i}>
					{i + 1 === navItems.length ? (
						<strong>{item}</strong>
					) : (
						<Link to={"/" + item.toLowerCase()}>{item}</Link>
					)}
				</li>
			))}
		</ol>
	);
};

export default TopNavigation;
