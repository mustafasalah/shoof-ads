import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const RecentWidget = ({ onSubmit }) => (
	<FormSideSection
		label="Recent Added"
		id="recent-added"
		submitBtn={onSubmit}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Recent Added"
				/>
			</div>

			<div className="col-2">
				<FormField
					name="layout.settings.shows_no"
					label="Shows per page"
					type="number"
					placeholder="default: 10"
					min="5"
				/>
			</div>

			<div className="col-2">
				<FormField name="layout.enabled" label="Enabled" type="radio" />
			</div>
		</div>
	</FormSideSection>
);

export default RecentWidget;
