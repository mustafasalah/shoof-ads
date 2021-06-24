import React, { Component, Fragment } from "react";
import Table from "./Table";
import TableControl from "./TableControl";
import Pagination from "./Pagination";

class ItemsPage extends Component {
	filterItems() {
		let { filters, items } = this.props,
			filteredItems = items;

		for (let filter in filters.select) {
			const { value: filterValue } = filters.select[filter];
			if (filterValue) {
				filteredItems = filteredItems.filter((item) => {
					if (Array.isArray(item[filter])) {
						return item[filter].includes(filterValue);
					}
					return item[filter].toString() === filterValue;
				});
			}
		}

		for (let filter in filters.search) {
			const { value: filterValue } = filters.search[filter];
			if (filterValue) {
				filteredItems = filteredItems.filter((item) =>
					new RegExp(filterValue, "i").test(item[filter])
				);
			}
		}
		this.filteredItems = filteredItems;
	}

	sortItems() {
		if (typeof this.filterItems === "undefined") return;
		const { sortColumn } = this.props,
			sortedItems = this.filteredItems;

		sortedItems.sort(
			({ [sortColumn.column]: a }, { [sortColumn.column]: b }) => {
				if (sortColumn.order === "desc") [a, b] = [b, a];
				return typeof a === "string" ? a.localeCompare(b) : a - b;
			}
		);

		this.sortedItems = sortedItems;
	}

	paginateItems() {
		if (typeof this.sortedItems === "undefined") return;
		const { itemsPerPage, currentPage } = this.props,
			start = (currentPage - 1) * itemsPerPage;

		this.paginatedItems = this.sortedItems.slice(
			start,
			start + itemsPerPage
		);
	}

	render() {
		const {
			tableColumns,
			sortColumn,
			filtersData,
			filters,
			selectedItems,
			actions,
			selectedAction,
			itemsPerPage,
			currentPage,
			onFilter,
			onItemsPerPageChange,
			onPageChange,
			onItemSelect,
			onItemsSelect,
			onSort,
			onActionChange,
			onActionApply,
			tableId,
		} = this.props;

		this.filterItems();
		this.sortItems();
		this.paginateItems();

		return (
			<Fragment>
				<TableControl
					onActionApply={onActionApply}
					onActionChange={onActionChange}
					onItemsPerPageChange={onItemsPerPageChange}
					selectedAction={selectedAction}
					actions={actions}
					onFilter={onFilter}
					filters={filters}
					filtersData={filtersData}
					itemsPerPage={itemsPerPage}
				/>
				{this.paginatedItems.length !== 0 ? (
					<Fragment>
						<Table
							id={tableId}
							onSort={onSort}
							onItemsSelect={onItemsSelect}
							onItemSelect={onItemSelect}
							allSelected={
								selectedItems.length ===
								this.paginatedItems.length
							}
							selectedRows={selectedItems}
							columns={tableColumns}
							data={this.paginatedItems}
							sortColumn={sortColumn}
						/>
						<Pagination
							onPageChange={onPageChange}
							itemsPerPage={itemsPerPage}
							currentPage={currentPage}
							totalItems={this.sortedItems.length}
						/>
					</Fragment>
				) : (
					<p className="not-available radius">There is no Content</p>
				)}
			</Fragment>
		);
	}
}

export default ItemsPage;
