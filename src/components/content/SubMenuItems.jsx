import React from "react";
import SubMenuForm from "./SubMenuForm";
import LinksList from "./LinksList";
import { connect } from "react-redux";
import mainMenuActions from "../../actions/MainMenuActions";

const SubMenuItems = ({ links, onEdit, onMove, onDelete }) => {
	return (
		<div className="row">
			<div className="col-1" style={{ marginTop: 25 }}>
				<SubMenuForm />
			</div>
			<div className="col-1" style={{ marginBottom: -25 }}>
				<LinksList
					links={links}
					onEdit={onEdit}
					onMove={onMove}
					onDelete={onDelete}
					title="Current SubMenu Items"
					forSubMenu
				/>
			</div>
		</div>
	);
};

export default connect(null, {
	onEdit: mainMenuActions.editSubMenuItem,
	onMove: mainMenuActions.moveSubMenuItem,
	onDelete: mainMenuActions.deleteMenuItem,
})(SubMenuItems);
