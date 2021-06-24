import React from "react";
import { Link } from "react-router-dom";
import { authorize } from "../js/Utility";

const AddMenu = ({ loggedUser, siteContent, active, onClick }) => {
	return (
		<div className="top-bar-btn" id="add-btn" title="Add Shows and Pages">
			<button
				className={active ? "active" : ""}
				onClick={() => {
					onClick(active ? "" : "addMenu");
				}}
			>
				<i className="fas fa-plus"></i>
			</button>
			<ul className="sub-menu blur-shadow">
				{(siteContent.includes("tvshows") ||
					siteContent.includes("anime")) && (
						<li>
							<Link to="/ads/add">
								<i className="fas fa-plus"></i> Add Ads
							</Link>
						</li>
					)}

				{siteContent.includes("movies") && (
					<li>
						<Link to="/shows/movies/add">
							<i className="fas fa-plus"></i> Add Movie
						</Link>
					</li>
				)}

				{siteContent.includes("anime") && (
					<li>
						<Link to="/shows/anime/add">
							<i className="fas fa-plus"></i> Add Anime
						</Link>
					</li>
				)}

				{siteContent.includes("tvshows") && (
					<li>
						<Link to="/playlists/add">
							<i className="fas fa-plus"></i> Add Playlist
						</Link>
					</li>
				)}

				{authorize(loggedUser.role, "admin") && (
					<li>
						<Link to="/pages/new">
							<i className="fas fa-plus"></i> Create Page
						</Link>
					</li>
				)}
			</ul>
		</div>
	);
};

export default AddMenu;
