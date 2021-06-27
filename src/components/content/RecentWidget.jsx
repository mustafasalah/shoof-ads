import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

const HOSTNAME = process.env.REACT_APP_HOSTNAME;

const RecentWidget = ({
    title,
    onPhrase,
    data,
    faClass,
    doBtnLabel,
    doBtnCondition,
    showMoreLink,
    doBtnAction,
    maxItems = 5,
}) => {
    return (
        <section className="widget list">
            <h3>
                <span>
                    <i className={faClass}></i> Recent {title}
                </span>
            </h3>
            <div className="widget-content blur-shadow radius">
                {data.length === 0 ? (
                    <p className="no-content">
                        There are no {title.toLowerCase()} yet
                    </p>
                ) : (
                    <ol>
                        {data.slice(0, maxItems).map((item) => (
                            <li key={item.id}>
                                <p className="item-info">
                                    <span>
                                        {item.author && (
                                            <a
                                                href={`${HOSTNAME}/users/${item.authorId}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item.author}
                                            </a>
                                        )}{" "}
                                        <i>{onPhrase}:</i>
                                    </span>
                                    <TimeAgo
                                        datetime={item.publishDate || item.date}
                                    />
                                </p>
                                <div className="item-content">
                                    <strong>
                                        <a
                                            href={`${HOSTNAME}/shows/${
                                                item.showId
                                            }${
                                                item.episodeNo != undefined
                                                    ? `/episodes/${item.episodeNo}`
                                                    : ""
                                            }`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item.showName}
                                            {item.episodeNo != undefined
                                                ? ` - Ad ${item.episodeNo}`
                                                : ""}
                                        </a>
                                    </strong>
                                    {(typeof doBtnCondition === "function" &&
                                        doBtnCondition(item)) ||
                                    doBtnCondition === undefined ? (
                                        <button
                                            className="do-btn radius-3 focus-shadow"
                                            type="button"
                                            onClick={() => doBtnAction(item.id)}
                                        >
                                            {doBtnLabel}
                                        </button>
                                    ) : undefined}
                                </div>
                            </li>
                        ))}
                        {data.length > maxItems && (
                            <li className="show-more">
                                <Link to={showMoreLink}>Show All</Link>
                            </li>
                        )}
                    </ol>
                )}
            </div>
        </section>
    );
};

export default RecentWidget;
