import React from "react";

const TableFilters = ({ filters, filtersData, onFilter }) => {
	return (
		<div id="table-filters">
			<label>
				<span>Filter Items</span>
			</label>

			{Object.entries(filters.select).map(([filterName, filter]) => {
				return (
					<div key={filterName} className="table-filter">
						<select
							value={filter.value}
							name={`${filterName}-filter`}
							onChange={({ currentTarget: select }) =>
								onFilter("select", {
									[filterName]: {
										label: filter.label,
										value: select.value,
									},
								})
							}
							className="radius-3"
						>
							<option value="">{filter.label}</option>

							{filtersData[filterName].map((opt) => (
								<option key={opt} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</div>
				);
			})}

			{Object.entries(filters.search).map(([filterName, filter]) => (
				<div key={filterName} className="table-filter search-filter">
					<input
						name={`${filterName}-filter`}
						value={filter.value}
						onChange={({ currentTarget: search }) =>
							onFilter("search", {
								[filterName]: {
									label: filter.label,
									value: search.value,
								},
							})
						}
						type="search"
						className="radius-3"
						placeholder={`playlist name...`}
					/>
				</div>
			))}
		</div>
	);
};

export default TableFilters;
