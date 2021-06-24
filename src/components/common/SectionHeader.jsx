import React from "react";
import { Link } from "react-router-dom";

const SectionHeader = (props) => {
	const { name, link, faClass = "fas fa-film" } = props;

	return (
		<h2>
			<span>
				<i className={faClass}></i> {name}
			</span>
			{link &&
				(link.content ? (
					<button className="add-new radius-3 have-nested-menu">
						{link.label}
						{link.content && (
							<ul className="nested-add-new-container blur-shadow">
								{link.content.map((nestedLink) => (
									<li
										className="nested-add-new"
										key={nestedLink.label}
									>
										<Link to={nestedLink.href}>
											{nestedLink.label}
										</Link>
									</li>
								))}
							</ul>
						)}
					</button>
				) : (
					<Link to={link.href} className="add-new radius-3">
						{link.label}
					</Link>
				))}
		</h2>
	);
};

export default SectionHeader;
