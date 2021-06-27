import React, { useState } from "react";
import { connect } from "react-redux";
import filterByPeriod, {
    ALL_TIME_PERIOD,
    WEEK_PERIOD,
    MONTH_PERIOD,
} from "../../js/FilterByPeriod";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const TopShowsWidget = ({ shows, showsNo = 5 }) => {
    const [period, setPeriod] = useState(ALL_TIME_PERIOD);
    shows = shows.filter((show) => filterByPeriod(show, period));
    shows = shows.sort((a, b) => +b.views - +a.views);

    return (
        <section className="widget list" id="top-shows">
            <header>
                <h3>
                    <span>
                        <i className="fas fa-star"></i> Top Playlists
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
                {shows.length === 0 ? (
                    <p className="no-content">
                        There are no playlist added
                        {period === ALL_TIME_PERIOD
                            ? ""
                            : period === WEEK_PERIOD
                            ? " this week"
                            : " this month"}{" "}
                        yet
                    </p>
                ) : (
                    <ol>
                        {shows.slice(0, showsNo).map((show) => {
                            const showUrl = `${HOSTNAME}/shows/${show.id}`;
                            return (
                                <li key={show.id}>
                                    <div className="item-image">
                                        <a
                                            href={showUrl}
                                            style={{
                                                backgroundImage: `url('${show.poster}')`,
                                            }}
                                            className="radius focus-shadow"
                                            target="_blank"
                                            rel="noreferrer"
                                        ></a>
                                    </div>
                                    <div className="item-info">
                                        <h4>
                                            <a
                                                href={showUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {show.name}
                                            </a>
                                        </h4>
                                        <p>
                                            <span className="views">
                                                {" "}
                                                Views: {show.views}
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </section>
    );
};

export default connect((state) => ({ shows: state.shows }))(TopShowsWidget);
