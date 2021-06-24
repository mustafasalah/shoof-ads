import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { connect } from "react-redux";

const defaultTitle = new Map([
	["slider", "Shows Slider"],
	["recent", "Recent Added"],
	["ads", "Ads"],
	["category", "Category of Shows"],
	["social_media", "Follow Us"],
	["search", "Advance Search"],
	["schedule", "Today's Schedule"],
	["selected_shows", "Picked Shows"],
	["about", "About Us"],
	["links_list", "Important Links"],
	["account", "Account"],
]);

const Widget = ({ data, dispatch, position, isActive, onClick }) => {
	const { title, type, enabled } = data;

	return (
		<div className="col-1">
			<div className="field">
				<div
					className={`widget-box radius blur-shadow${
						enabled === "0" ? " disabled" : ""
					}${isActive ? " active" : ""}`}
				>
					<h4 className={type}>{title || defaultTitle.get(type)}</h4>
					<button
						className="settings-btn dark-btn focus-shadow radius-3"
						type="button"
						onMouseDown={() => {
							// scroll to top
							window.scrollTo(0, 0);

							dispatch({
								type: ACTIONS.LOAD_LAYOUT_WIDGET_FORM,
								widget: data,
								formType: "layout",
								position,
							});

							// handler to make this widget active
							typeof onClick === "function" && onClick();
						}}
					>
						<i className="fas fa-sliders-h"></i> Settings
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect()(Widget);
