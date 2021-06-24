import React, { Component } from "react";
import TableCell from "./TableCell";

class TableBody extends Component {
	render() {
		const { data, columns, selectedRows, onItemSelect } = this.props;

		return (
			<tbody>
				{data.map((item) => (
					<tr key={item.id}>
						<td>
							<input
								checked={selectedRows.includes(item.id)}
								onChange={({ currentTarget: input }) =>
									onItemSelect(item.id, input.checked)
								}
								type="checkbox"
								id={`select_item_${item.id}`}
							/>
							<label htmlFor={`select_item_${item.id}`}></label>
						</td>
						{columns.map((col, i) => {
							return (
								<TableCell
									key={i}
									rowData={item}
									data={item[col.dataProp]}
									column={col}
								/>
							);
						})}
					</tr>
				))}
			</tbody>
		);
	}
}

export default TableBody;
