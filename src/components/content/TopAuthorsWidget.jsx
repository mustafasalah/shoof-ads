import React, { useState } from "react";
import { connect } from "react-redux";
import { upperFirst } from "../../js/Utility";
import filterByPeriod, {
	ALL_TIME_PERIOD,
	WEEK_PERIOD,
	MONTH_PERIOD,
} from "../../js/FilterByPeriod";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const getTopAuthors = ({ authors, shows, episodes }, period) => {
	const topAuthors = new Map();

	shows = shows.filter((show) => filterByPeriod(show, period));
	episodes = episodes.filter((episode) => filterByPeriod(episode, period));

	const countAuthorsContent = (contentType = "shows") => {
		const data = contentType === "shows" ? shows : episodes;

		for (const { authorId } of data) {
			let authorCounter = topAuthors.get(authorId) || {
				[contentType]: 0,
			};

			if (typeof authorCounter[contentType] === "number") {
				authorCounter[contentType]++;
			} else {
				authorCounter[contentType] = 1;
			}

			topAuthors.set(authorId, authorCounter);
		}
	};

	// count authors shows and episodes
	countAuthorsContent("shows");
	countAuthorsContent("episodes");

	// sort authors by highest number of shows and episodes
	authors.sort((a, b) => {
		a = topAuthors.get(a.id);
		if (a === undefined) return 1;

		b = topAuthors.get(b.id);
		if (b === undefined) return -1;

		const totalA = (a.shows || 0) + (a.episodes || 0);
		const totalB = (b.shows || 0) + (b.episodes || 0);

		return totalB - totalA;
	});

	return {
		authors,
		statistics: topAuthors,
	};
};

const TopAuthorsWidget = ({ authorsNo = 5, ...props }) => {
	const [period, setPeriod] = useState(ALL_TIME_PERIOD);
	const { authors, statistics } = getTopAuthors(props, period);

	return (
		<section className="widget list" id="top-authors">
			<header>
				<h3>
					<span>
						<i className="fas fa-crown"></i> Top Authors
					</span>
				</h3>
				<select
					className="widget-options radius-3"
					onChange={({ currentTarget: input }) =>
						setPeriod(+input.value)
					}
					value={period}
				>
					<option value={WEEK_PERIOD}>This Week</option>
					<option value={MONTH_PERIOD}>This Month</option>
					<option value={ALL_TIME_PERIOD}>All Time</option>
				</select>
			</header>
			<div className="widget-content blur-shadow radius">
				<ol>
					{authors.slice(0, authorsNo).map((author) => {
						const authorUrl = `${HOSTNAME}/users/${author.id}`;
						return (
							<li key={author.id}>
								<div className="item-image">
									<a
										href={authorUrl}
										style={{
											backgroundImage: `url('${author.profileImage}')`,
										}}
										className="focus-shadow"
										target="_blank"
										rel="noreferrer"
									></a>
								</div>
								<div className="item-info">
									<h4>
										<a
											href={authorUrl}
											target="_blank"
											rel="noreferrer"
										>
											{author.name}
										</a>
									</h4>
									<p>
										<span>{upperFirst(author.role)}</span>
									</p>
								</div>
								<div className="author-statistics">
									<span className="statistic">
										<strong>
											{statistics.get(author.id)?.shows ||
												0}
										</strong>
										<span>Show</span>
									</span>
									<span className="statistic">
										<strong>
											{statistics.get(author.id)
												?.episodes || 0}
										</strong>
										<span>Episode</span>
									</span>
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</section>
	);
};

export default connect((state) => ({
	shows: state.shows,
	authors: state.users.filter((user) => user.role !== "user"),
	episodes: state.episodes,
}))(TopAuthorsWidget);
