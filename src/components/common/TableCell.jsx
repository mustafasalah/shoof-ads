import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { authorize } from "./../../js/Utility";
import store from "./../../store";

class TableCell extends Component {
	renderLinksNav() {
		const { rowData } = this.props;
		const { linksNav = null } = this.props.column;

		if (linksNav) {
			return (
				<ul>
					{linksNav
						.filter((link) => {
							// Authorize this link
							return (
								link.permission === undefined ||
								authorize(
									store.getState().loggedUser.role,
									link.permission
								) ||
								store.getState().loggedUser.id ===
									rowData.authorId ||
								(typeof link.customAuthorize === "function"
									? link.customAuthorize(rowData)
									: false)
							);
						})
						.map((link, i) => {
							if ((link.on && link.on(rowData)) || !link.on) {
								const url = link.href.replace(
									/:(\w+)/gi,
									(match, prop) => rowData[prop]
								);
								return (
									<li key={i}>
										{link.absolute ? (
											<a
												href={url}
												className={link.className}
												target="_blank"
												rel="noreferrer"
												onClick={(e) => {
													if (
														typeof link.onClick ===
														"function"
													) {
														e.preventDefault();
														link.onClick(rowData);
													}
												}}
											>
												<span>{link.label}</span>
											</a>
										) : (
											<Link
												to={url}
												className={link.className}
												onClick={(e) => {
													if (
														typeof link.onClick ===
														"function"
													) {
														e.preventDefault();
														link.onClick(rowData);
													}
												}}
											>
												<span>{link.label}</span>
											</Link>
										)}
									</li>
								);
							}
						})}
				</ul>
			);
		}

		return "";
	}

	renderContent() {
		const { column, data, rowData } = this.props;

		switch (column.type) {
			case "img":
				return (
					<img
						className="radius focus-shadow"
						src={data}
						alt={rowData.name}
					/>
				);

			case "link":
				const hrefValue = column.href.replace(
					/:(\w+)/gi,
					(match, prop) => rowData[prop]
				);
				return (
					<Fragment>
						{column.externalLink ? (
							<a
								href={hrefValue}
								target="_blank"
								rel="noreferrer"
							>
								{data}
							</a>
						) : (
							<Link to={hrefValue}>{data}</Link>
						)}
						{this.renderLinksNav()}
					</Fragment>
				);

			case "custom":
				return (
					<Fragment>
						{column.render(rowData, this.renderLinksNav.bind(this))}
					</Fragment>
				);

			default:
				return (
					<Fragment>
						{column.render && column.render(rowData)}
						{data !== undefined && data !== null
							? data
							: column.default || ""}
						{this.renderLinksNav()}
					</Fragment>
				);
		}
	}

	render() {
		return (
			<td className={this.props.column.classNames || ""}>
				{this.renderContent()}
			</td>
		);
	}
}

export default TableCell;
