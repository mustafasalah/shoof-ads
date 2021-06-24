import React from "react";
import TableActions from "./TableActions";
import TableFilters from "./TableFilters";
import TableItemsPerPage from "./TableItemsPerPage";

const TableControl = ({
	filters,
	filtersData,
	itemsPerPage,
	actions,
	selectedAction,
	onFilter,
	onItemsPerPageChange,
	onActionChange,
	onActionApply,
}) => {
	return (
		<div id="control-section">
			<div className="start-side">
				<TableActions
					selectedAction={selectedAction}
					actions={actions}
					onActionChange={onActionChange}
					onActionApply={onActionApply}
				/>
				<TableFilters
					onFilter={onFilter}
					filters={filters}
					filtersData={filtersData}
				/>
			</div>
			<div className="end-side">
				<TableItemsPerPage
					onItemsPerPageChange={onItemsPerPageChange}
					value={itemsPerPage}
				/>
			</div>
		</div>
	);
};

export default TableControl;
