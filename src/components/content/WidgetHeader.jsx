import React from "react";

const WidgetHeader = ({ title }) => {
	return (
		<div className="field">
			<div className="widget-section">
				<h3>
					<span className="radius-3 focus-shadow">{title}</span>
				</h3>
			</div>
		</div>
	);
};

export default WidgetHeader;
