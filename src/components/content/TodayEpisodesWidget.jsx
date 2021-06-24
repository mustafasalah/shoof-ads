import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const getTodayShowsIds = (today, schedulers) => {
	const days = new Map([
		[0, "sun"],
		[1, "mon"],
		[2, "tue"],
		[3, "wed"],
		[4, "thu"],
		[5, "fri"],
		[6, "sat"],
	]);

	return schedulers
		.filter((schedule) => schedule.day === days.get(today))
		.map((schedule) => schedule.showId);
};

const TodayEpisodesWidget = ({ schedulers, shows, episodes }) => {
	const today = new Date().getDay();
	const todayShowsIds = getTodayShowsIds(today, schedulers);
	const history = useHistory();
	const todayShows = shows.filter((show) => {
		const isTodayShow = todayShowsIds.includes(show.id);

		if (isTodayShow) {
			const showEpisodes = episodes
				.filter((ep) => ep.showId === show.id)
				.sort((a, b) => a.episodeNo - b.episodeNo);

			// Calc the next episode number and set the result in extra prop in show object
			if (showEpisodes.length === 0) show.nextEp = 1;
			else {
				const lastAddedEp = showEpisodes.pop();

				// Check if the last added episode is not added today
				// if it was added today then check this episode as already added
				// and get its episode no as next episode number of the show
				if (new Date(lastAddedEp.publishDate).getDay() === today) {
					show.episodeAlreadyAdded = true;
					show.nextEp = lastAddedEp.episodeNo;
				} else {
					show.nextEp = lastAddedEp.episodeNo + 1;
				}
			}

			// Set show time as extra prop in show object
			show.time = schedulers.find(
				(schedule) => schedule.showId === show.id
			).time;

			return true;
		}

		return false;
	});

	return (
		<section className="widget" id="day-shows">
			<h3>
				<span>
					<i className="fas fa-calendar-day"></i> Today's Episodes
				</span>
			</h3>
			<div className="widget-content radius blur-shadow">
				{todayShows.length === 0 ? (
					<p className="no-content">
						There are no episodes showing today to add
					</p>
				) : (
					<ul>
						{todayShows.map((show) => {
							const showUrl = `${HOSTNAME}/shows/${show.id}`;
							return (
								<li key={show.id}>
									<div className="show-poster">
										<a
											href={showUrl}
											className="focus-shadow radius"
											title={show.name}
											style={{
												backgroundImage: `url('${show.poster}')`,
											}}
											target="_blank"
											rel="noreferrer"
										></a>
									</div>
									<div className="show-info">
										<dl>
											<dt>Show Name:</dt>
											<dd>
												<a href={showUrl}>
													{show.name} - Episode{" "}
													{show.nextEp}
												</a>
											</dd>

											<dt>Show Time:</dt>
											<dd>
												<time dateTime={show.time}>
													{show.time} GMT
												</time>
											</dd>
										</dl>
										<button
											className={`do-btn radius-3${
												show.episodeAlreadyAdded
													? ""
													: " focus-shadow"
											}`}
											onClick={() => {
												history.push(`/episodes/add/`, {
													show_id: show.id,
													episode_no: show.nextEp,
												});
											}}
											disabled={show.episodeAlreadyAdded}
										>
											{show.episodeAlreadyAdded
												? " Added"
												: " Add"}
										</button>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</section>
	);
};

export default connect((state) => ({
	schedulers: state.schedule.schedulers,
	shows: state.shows,
	episodes: state.episodes,
}))(TodayEpisodesWidget);
