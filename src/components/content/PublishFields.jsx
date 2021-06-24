import React from "react";
import { Fragment } from "react";
import FormField from "./../common/form/FormField";
import getAuthors from "./../services/authorsServices";
import { connect } from "react-redux";
import { authorize } from "./../../js/Utility";

const PublishFields = ({
	loggedUser: { role },
	form,
	forms,
	submitLabel = "Publish",
	extraFields,
	deleteBtn,
}) => {
	return (
		<Fragment>
			<div className="row">
				<div className="col-3-1">
					<FormField
						label="Status"
						name={`${form}.published`}
						type="select"
						defaultValue="publish"
						options={[
							{ label: "Draft", value: "0" },
							{ label: "Publish", value: "1" },
						]}
					/>
				</div>

				<div className="col-3-2">
					<FormField
						label="Author"
						name={`${form}.author`}
						type="select"
						options={getAuthors().map((author) => ({
							label: author.name,
							value: +author.id,
						}))}
						disabled={
							authorize(role, "supervisor")
								? forms[form].data.id === ""
									? true
									: false
								: true
						}
					/>
				</div>

				<div className="col-1">
					<FormField
						label="Keywords"
						name={`${form}.keywords`}
						type="text"
						htmlAfterField={
							<small>
								Used to find the {form} in the search engine
							</small>
						}
					/>
				</div>

				<div className="col-1">
					<FormField
						label="Description"
						name={`${form}.description`}
						type="textarea"
						htmlAfterField={
							<small>
								Shown in search engine results below {form} title
							</small>
						}
					/>
				</div>

				<div className="col-2">
					<FormField
						label="Publish Date"
						name={`${form}.publish_date.date`}
						className="date"
						type="text"
						placeholder="today's date"
						autoComplete="off"
						dateType="date-from"
					/>
				</div>

				<div className="col-2">
					<FormField
						label="Publish Time"
						name={`${form}.publish_date.time`}
						className="time"
						type="text"
						placeholder="current time"
					/>
				</div>

				{extraFields &&
					extraFields.map((field, i) => (
						<div key={i} className="col-1">
							{field}
						</div>
					))}
			</div>

			<button type="submit" className="primary-btn focus-shadow radius">
				{submitLabel}
			</button>

			{deleteBtn && (
				<button
					type="button"
					className="delete-btn dark-btn focus-shadow radius"
					onClick={() => deleteBtn.handler()}
				>
					{deleteBtn.label || "Delete"}
				</button>
			)}
		</Fragment>
	);
};

export default connect((state) => ({
	loggedUser: state.loggedUser,
	forms: state.forms,
}))(PublishFields);
