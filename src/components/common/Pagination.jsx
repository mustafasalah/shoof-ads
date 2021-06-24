import React, { Component } from "react";
import { Link } from "react-router-dom";
import { paginationLength } from "../../configs.json";
import { range } from "../../js/Utility";

class Pagination extends Component {
	getPaginationRange(pagesNo) {
		const { currentPage } = this.props;

		if (pagesNo <= paginationLength) return range(1, pagesNo);
		else {
			let start = currentPage - Math.floor(paginationLength / 2);
			start = start < 1 ? 1 : start;

			let end = start + paginationLength - 1;
			end = end > pagesNo ? pagesNo : end;

			return range(start, end);
		}
	}

	render() {
		const {
			currentPage,
			totalItems,
			itemsPerPage,
			onPageChange,
		} = this.props;

		const pagesNo = Math.ceil(totalItems / itemsPerPage);

		return (
			<div id="pagination-wrapper">
				<ul className="radius-3">
					<li title="First Page" className="first">
						<button
							className="nav-btn"
							onClick={() => onPageChange(1)}
							disabled={currentPage === 1}
						>
							<i className="fas fa-angle-double-left"></i> First
						</button>
					</li>
					{this.getPaginationRange(pagesNo).map((pageNo) => {
						if (pageNo === currentPage) {
							return (
								<li
									key={pageNo}
									title="Selected Page"
									className="active"
								>
									<span>{pageNo}</span>
								</li>
							);
						} else {
							return (
								<li key={pageNo}>
									<Link
										to={(location) => {
											location.search = `page-no=${pageNo}`;
											return location;
										}}
										onClick={() => onPageChange(pageNo)}
									>
										{pageNo}
									</Link>
								</li>
							);
						}
					})}
					<li title="Last Page" className="last">
						<button
							className="nav-btn"
							onClick={() => onPageChange(pagesNo)}
							disabled={currentPage === pagesNo}
						>
							Last <i className="fas fa-angle-double-right"></i>
						</button>
					</li>
				</ul>
			</div>
		);
	}
}

export default Pagination;
