import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { connect } from "react-redux";

const AddMoreBtn = ({ label, formName, listName, dispatch }) => {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				dispatch({
					type: ACTIONS.FORM_ADD_ITEM_LIST,
					formName,
					listName,
				});
			}}
			className="dark-btn more-btn focus-shadow radius"
		>
			{" " + label}
		</button>
	);
};

export default connect()(AddMoreBtn);
