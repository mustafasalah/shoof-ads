import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const SchedulerWidget = ({ onSubmit }) => (
	<FormSideSection
		label="Today's Schedule"
		id="today-schedule"
		submitBtn={onSubmit}
	>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Today's Schedule"
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>
							Enable or Disable Today Schedule in the Home Page
						</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default SchedulerWidget;
