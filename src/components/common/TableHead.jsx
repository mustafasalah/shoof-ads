import React from "react";

const TableHead = ({
	columns,
	sortColumn,
	data,
	allSelected,
	onItemsSelect,
	onSort,
}) => {
	return (
		<thead>
			<tr>
				<th>
					<input
						type="checkbox"
						id="select_all"
						checked={allSelected}
						onChange={({ currentTarget: input }) =>
							onItemsSelect(data, input.checked)
						}
					/>
					<label htmlFor="select_all"></label>
				</th>
				{columns.map((column, i) => (
					<th
						key={i}
						onClick={() => {
							if (!column.haveSort) return;
							if (column.dataProp === sortColumn.column) {
								onSort({
									column: column.dataProp,
									order:
										sortColumn.order === "asc"
											? "desc"
											: "asc",
								});
							} else {
								onSort({
									column: column.dataProp,
									order: "desc",
								});
							}
						}}
						className={getColumnClassName(column, sortColumn)}
					>
						{column.label}
					</th>
				))}
			</tr>
		</thead>
	);
};

function getColumnClassName(column, sortColumn) {
	if (!column.haveSort) return "";
	let className = "have-sort";
	if (column.dataProp === sortColumn.column) {
		className += sortColumn.order === "asc" ? " sort-up" : " sort-down";
	}

	return className;
}

export default TableHead;
