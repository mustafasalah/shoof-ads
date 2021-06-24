import React from "react";
import { connect } from "react-redux";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import AbstractShows from "../common/AbstractShows";
import SectionHeader from "../common/SectionHeader";

class TVShows extends AbstractShows {
	sectionHeader = (
		<SectionHeader
			name="TV Shows"
			link={{ href: "/shows/tv-shows/add", label: "New TV Show" }}
		/>
	);
}

const mapStateToProps = (state) => ({
	...state.tables.tvshows,
	items: state.shows.filter((show) => show.category === "tvshow"),
	loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
	...getTableActions("tvshows"),
	...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(TVShows);
