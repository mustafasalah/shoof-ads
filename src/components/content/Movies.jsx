import React from "react";
import { connect } from "react-redux";
import AbstractShows from "../common/AbstractShows";
import getTableActions from "../../actions/TableActions";
import getDataActions from "../../actions/DataActions";
import SectionHeader from "../common/SectionHeader";

class Movies extends AbstractShows {
	sectionHeader = (
		<SectionHeader
			name="Movies"
			link={{ href: "/shows/movies/add", label: "New Movie" }}
		/>
	);

	constructor(props) {
		super(props);
		this.tableColumns[1].label = "Movie Name";
	}
}

const mapStateToProps = (state) => ({
	...state.tables.movies,
	items: state.shows.filter((show) => show.category === "movie"),
	loggedUser: state.loggedUser,
});

const mapDispatchToProps = {
	...getTableActions("movies"),
	...getDataActions("shows"),
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
