import React from "react";
import * as ACTIONS from "../../actions/ActionTypes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ArcsListItem = ({ arc, dispatch }) => {
	const { id, key, no, name } = arc;

	return (
		<li>
			<div className="arc-info">
				<span>Arc {no.toString().padStart(2, "0")}: </span>
				<strong>{name}</strong>
			</div>
			<ul className="arc-actions">
				<li>
					<a
						href="#edit-arc"
						className="edit"
						onClick={(e) => {
							e.preventDefault();
							dispatch({
								type: ACTIONS.EDIT_ARC,
								arc_data: {
									id,
									key,
									no,
									name,
								},
							});
						}}
					>
						{" "}
						edit
					</a>

					<a
						href="#delete-arc"
						className="delete"
						onClick={(e) => {
							e.preventDefault();
							dispatch({
								type: ACTIONS.DELETE_ARC,
								arc_id: id,
								key,
							});
						}}
					>
						{" "}
						delete
					</a>
				</li>
			</ul>
		</li>
	);
};

export default connect()(ArcsListItem);
