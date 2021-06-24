import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const AboutWidget = ({ onSubmit }) => (
	<FormSideSection label="About Us" id="about-us" submitBtn={onSubmit}>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: About Us"
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.settings.content"
					label="Content"
					type="textarea"
					placeholder="Enter something about website..."
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>Enable or Disable About Us in the Footer</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default AboutWidget;
