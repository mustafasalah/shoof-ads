import React, { useEffect } from "react";
import renderChartJS from "../../js/viewsChart";

const ViewsDiagramWidget = () => {
	useEffect(() => {
		renderChartJS();
	}, []);

	return (
		<section className="widget" id="views-diagram">
			<header>
				<h3>
					<span>
						<i className="fas fa-chart-line"></i> Views Diagram
					</span>
				</h3>

				<select
					className="widget-options radius-3"
					id="diagram-control"
					defaultValue="week"
				>
					<option value="today">Today</option>
					<option value="week">This Week</option>
					<option value="month">This Month</option>
					<option value="year">This Year</option>
				</select>
			</header>
			<div className="widget-content radius blur-shadow">
				<canvas id="myChart"></canvas>
			</div>
		</section>
	);
};

export default ViewsDiagramWidget;
