import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { authorize, upperFirst } from "./../js/Utility";
import { connect } from "react-redux";

const renderShowsLinks = (siteContent) => {
    if (siteContent.length > 1) {
        const result = [];

        result[0] = (
            <li key="all">
                <NavLink exact to="/shows">
                    All Shows
                </NavLink>
            </li>
        );

        for (let content of siteContent) {
            if (content === "tvshows") content = "tv-shows";
            result.push(
                <li key={content}>
                    <NavLink to={`/shows/${content}`}>
                        {content === "tv-shows"
                            ? "TV Shows"
                            : upperFirst(content)}
                    </NavLink>
                </li>
            );
        }

        return result;
    } else {
        if (siteContent.length === 0) return;

        let content = siteContent[0];
        if (content === "tvshows") content = "tv-shows";

        return (
            <li>
                <NavLink to={`/playlists`} className="radius">
                    <i className="fas fa-film"></i>{" "}
                    {content === "tv-shows" ? "Playlists" : upperFirst(content)}
                </NavLink>
            </li>
        );
    }
};

const NavBar = ({
    loggedUser: { role },
    settings: { site_content: siteContent, comments_enabled, reviews_enabled },
}) => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/dashboard" className="radius">
                        <i className="fas fa-chart-area"></i> Dashboard
                    </NavLink>
                </li>

                {siteContent.length === 1 ? (
                    renderShowsLinks(siteContent)
                ) : (
                    <li>
                        <NavLink to="/shows" className="radius">
                            <i className="fas fa-film"></i> Shows
                        </NavLink>

                        <ul className="sub-menu blur-shadow radius">
                            {renderShowsLinks(siteContent)}
                        </ul>
                    </li>
                )}

                {(siteContent.includes("tvshows") ||
                    siteContent.includes("anime")) && (
                    <li>
                        <NavLink to="/ads" className="radius">
                            <i className="fas fa-film"></i> Ads
                        </NavLink>

                        <ul className="sub-menu blur-shadow radius">
                            <li>
                                <NavLink exact to="/ads">
                                    All Ads
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/ads/add" className="add-link">
                                    Add Ads
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                )}

                {comments_enabled === "1" && (
                    <li>
                        <NavLink to="/comments" className="radius">
                            <i className="fas fa-comments"></i> Comments
                        </NavLink>
                    </li>
                )}

                {reviews_enabled === "1" && (
                    <li>
                        <NavLink to="/reviews" className="radius">
                            <i className="fas fa-star-half-alt"></i> Reviews
                        </NavLink>
                    </li>
                )}

                <li>
                    <NavLink to="/reports" className="radius">
                        <i className="fas fa-bug"></i> Reports
                    </NavLink>
                </li>

                {/* {authorize(role, "supervisor") && (
                    <li>
                        <NavLink to="/scheduler" className="radius">
                            <i className="fas fa-calendar-alt"></i> Scheduler
                        </NavLink>
                    </li>
                )} */}

                {authorize(role, "admin") && (
                    <Fragment>
                        <li>
                            <NavLink to="/users" className="radius">
                                <i className="fas fa-users"></i> Users
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/users">
                                        All Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/users/new"
                                        className="add-link"
                                    >
                                        Add User
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/pages" className="radius">
                                <i className="fas fa-copy"></i> Pages
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/pages">
                                        All Pages
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/pages/new"
                                        className="add-link"
                                    >
                                        Create Page
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/layout" className="radius">
                                <i className="fas fa-brush"></i> Layout and View
                            </NavLink>

                            <ul className="sub-menu blur-shadow radius">
                                <li>
                                    <NavLink exact to="/layout">
                                        Site Layout
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/layout/main-menu">
                                        Menu Layout
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <NavLink to="/settings" className="radius">
                                <i className="fas fa-cogs"></i> General Settings
                            </NavLink>
                        </li>
                    </Fragment>
                )}
            </ul>
        </nav>
    );
};

export default connect((state) => ({
    loggedUser: state.loggedUser,
    settings: state.forms.settings.data,
}))(NavBar);
