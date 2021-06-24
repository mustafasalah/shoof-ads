import React from "react";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";

const getWidgetTypeOptions = (position) => {
	const widgetTypeOptions = [{ label: "Ads", value: "ads" }];

	if (position === "main") {
		widgetTypeOptions.push({
			label: "Category",
			value: "category",
		});
	} else {
		widgetTypeOptions.push({
			label: "Picked Shows",
			value: "selected_shows",
		});
	}

	return widgetTypeOptions;
};

const AddWidget = ({ onSubmit, position }) => {
	return (
		<FormSideSection
			label="Add Widget"
			id="add-widget"
			submitBtn={onSubmit}
		>
			<div className="row">
				<div className="col-1">
					<FormField
						name="layout.position"
						label="Widget Position"
						type="select"
						placeholder="Select widget position"
						options={[
							{
								label: "Main",
								value: "main",
							},
							{
								label: "Sidebar",
								value: "sidebar",
							},
						]}
					/>
				</div>
				<div className="col-1">
					<FormField
						name="layout.widgetType"
						label="Widget Type"
						type="select"
						placeholder="Select Widget Type..."
						options={getWidgetTypeOptions(position)}
					/>
				</div>
			</div>
		</FormSideSection>
	);
};

export default AddWidget;
