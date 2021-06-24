import React from "react";
import { Link } from "react-router-dom";

const StatisticWidget = ({ title, data, faClass, moreLink }) => {
	let totalCounter = 0;

	return (
		<div className={`statistic radius focus-shadow ${title.toLowerCase()}`}>
			<h3>
				<span>{title}</span>
			</h3>
			<div className="statistic-content">
				<div className="info-side">
					<ul>
						{data.map(({ label, counter }) => {
							totalCounter += counter;
							return (
								<li key={label}>
									<span className="count">
										{String(counter).padStart(2, "0")}
									</span>{" "}
									{label}
								</li>
							);
						})}
						<li>
							<span className="count">
								{String(totalCounter).padStart(2, "0")}
							</span>{" "}
							Total {title}
						</li>
					</ul>
				</div>
				<div className="icon-details-side">
					<i className={faClass}></i>
					<Link to={moreLink} className="more-detials">
						more detials
					</Link>
				</div>
			</div>
		</div>
	);
};

export default StatisticWidget;
