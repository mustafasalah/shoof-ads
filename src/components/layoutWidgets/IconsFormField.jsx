import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as ACTIONS from "../../actions/ActionTypes";

const icons = [
	["fire", "fab fa-hotjar"],
	["film", "fas fa-film"],
	["star", "fas fa-star"],
	["crown", "fas fa-crown"],
	["heart", "fas fa-heart"],
];

const IconsFormField = ({ icon, dispatch }) => {
	const onSelectHandler = ({ currentTarget: input }) => {
		dispatch({
			type: ACTIONS.FORM_ADD,
			fieldName: "settings.icon",
			fieldValue: input.value,
			formType: "layout",
		});
	};

	return (
		<div className="field">
			<label htmlFor="selected-shows-icon">Widget Icon</label>
			<div className="icons-wrapper">
				{icons.map(([name, classValue]) => (
					<Fragment key={name}>
						<input
							name="selected-shows-icon"
							value={name}
							id={`${name}-icon`}
							type="radio"
							checked={icon === name}
							onChange={onSelectHandler}
						/>
						<label htmlFor={`${name}-icon`}>
							<i className={classValue}></i>
						</label>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default connect((state) => ({
	icon: state.forms.layout.data.settings.icon,
}))(IconsFormField);
