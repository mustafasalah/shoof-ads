import React from "react";

const mapTypes = new Map([
	["link", "Custom Link"],
	["category", "Category"],
	["tag", "Tag"],
	["genre", "Genre"],
	["page", "Page"],
]);

const MenuItem = ({ item, onDelete, onEdit }) => {
	const { id, label, type, nested_in } = item;

	return (
		<div className="col-1">
			<div className="row">
				<div className="col-1">
					<div className="field">
						<div className="widget-box radius blur-shadow">
							<h4>{label}</h4>
							<button
								type="button"
								className="sub-link dark-btn radius-3 blur-shadow"
								onMouseDown={() => {}}
							>
								Add sub items
							</button>

							<i className="link-type" title="link type">
								{mapTypes.get(type)}
							</i>
							<div className="btns-wrapper">
								<button
									title="edit link"
									type="button"
									className="edit-btn"
									onMouseUp={() => {
										onEdit(item);
										window.scrollTo(0, 0);
									}}
								></button>
								<button
									title="delete link"
									type="button"
									className="delete-btn"
									onMouseUp={() => {
										onDelete(id, nested_in);
									}}
								></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuItem;
