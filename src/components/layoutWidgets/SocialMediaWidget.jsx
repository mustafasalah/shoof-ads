import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const SocialMediaWidget = ({ onSubmit }) => (
	<FormSideSection label="Follow Us" id="social-media" submitBtn={onSubmit}>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Follow Us"
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>
							Social Media links can be added in general settings
						</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default SocialMediaWidget;
