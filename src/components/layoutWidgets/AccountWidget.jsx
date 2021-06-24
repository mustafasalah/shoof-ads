import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const AccountWidget = ({ onSubmit }) => (
	<FormSideSection label="Account" id="account" submitBtn={onSubmit}>
		<div className="row">
			<div className="col-1">
				<FormField
					name="layout.title"
					label="Title"
					type="text"
					placeholder="default: Account"
				/>
			</div>
			<div className="col-1">
				<FormField
					name="layout.enabled"
					label="Enabled"
					type="radio"
					htmlAfterField={
						<small>
							Enable or Disable Account Links in the Footer
						</small>
					}
				/>
			</div>
		</div>
	</FormSideSection>
);

export default AccountWidget;
