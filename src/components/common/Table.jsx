import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = ({
	columns,
	id,
	sortColumn,
	data,
	selectedRows,
	allSelected,
	onItemSelect,
	onItemsSelect,
	onSort,
}) => {
	return (
		<div id="table-wrapper" className="radius">
			<table id={id || ""}>
				<TableHead
					onSort={onSort}
					onItemsSelect={onItemsSelect}
					columns={columns}
					allSelected={allSelected}
					selectedRows={selectedRows}
					data={data}
					sortColumn={sortColumn}
				/>
				<TableBody
					onItemSelect={onItemSelect}
					columns={columns}
					selectedRows={selectedRows}
					data={data}
				/>
			</table>
		</div>
	);
};

export default Table;
