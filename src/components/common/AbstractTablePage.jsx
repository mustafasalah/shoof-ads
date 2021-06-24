import React, { Component, Fragment } from "react";
import ItemsPage from "./../common/ItemsPage";
import Loader from "./Loader";
import { authorize } from "./../../js/Utility";

class AbstractTablePage extends Component {
	componentDidMount() {
		const { items, onPageChange } = this.props;
		const pageNo = this.getCurrentPage(items);
		pageNo > 1 && onPageChange(pageNo);
	}

	authorizeActionOnSelectedItems() {
		let { selectedItems, items, loggedUser } = this.props;

		// filter the selectItem if the logged user is authorized to the action
		// with all selected items only his own items
		if (authorize(loggedUser.role, "supervisor") === false) {
			selectedItems = selectedItems.filter((id) => {
				return (
					items.find((item) => item.id === id).authorId ===
					loggedUser.id
				);
			});
		}

		return selectedItems;
	}

	getCurrentPage(items) {
		const { location } = this.props,
			querys = location.search
				.slice(1)
				.split("&")
				.map((q) => {
					let [name, value] = q.split("=");
					value = decodeURI(value);
					return { name, value };
				});

		let pageQuery = querys.find((q) => q.name === "page-no"),
			currentPage = pageQuery ? Number(pageQuery.value) : 1,
			pagesNo = Math.ceil(items.length / this.props.itemsPerPage);

		if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
		else if (currentPage > pagesNo) {
			currentPage = pagesNo;
		}

		return currentPage;
	}

	render() {
		const {
			selectedItems,
			selectedAction,
			filters,
			items,
			currentPage,
			itemsPerPage,
			sortColumn,
			onItemsSelect,
			onItemSelect,
			onPageChange,
			onItemsPerPageChange,
			onFilter,
			onSort,
			onActionChange,
			onActionApply,
		} = this.props;

		return (
			<Fragment>
				{this.sectionHeader}
				{items.loading ? (
					<Loader />
				) : (
					<ItemsPage
						onActionApply={onActionApply}
						onActionChange={onActionChange}
						onSort={onSort}
						onItemsSelect={onItemsSelect}
						onItemSelect={onItemSelect}
						onPageChange={onPageChange}
						onItemsPerPageChange={onItemsPerPageChange}
						onFilter={onFilter}
						selectedAction={selectedAction}
						actions={this.actions}
						selectedItems={selectedItems}
						tableColumns={this.tableColumns}
						filtersData={this.filtersData}
						filters={filters}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						items={items}
						sortColumn={sortColumn}
						tableId={this.tableId}
					/>
				)}
			</Fragment>
		);
	}
}

export default AbstractTablePage;
