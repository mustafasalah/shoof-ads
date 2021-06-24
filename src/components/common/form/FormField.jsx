import React, { Fragment } from "react";
import { connect } from "react-redux";
import Select from "./Select";
import formActions from "./../../../actions/FormActions";
import Input from "./Input";
import { getNestedProperty } from "./../../../js/Utility";

const FormField = ({
	className,
	labelClass,
	label,
	type,
	name,
	required,
	htmlAfterField,
	unwrappedField,
	dateType,
	dispatch,
	forms,
	labelAfter,
	...props
}) => {
	const fieldName = label.replace(" ", "-").toLowerCase() + "-field-" + name;
	const isControlled = name !== "" && type !== "file" ? true : undefined;

	let formName, formField, onFieldChanged;

	if (name !== "") {
		const index = name.indexOf(".");
		formName = name.slice(0, index);
		formField = name.slice(index + 1);
		const onChange = formActions.onFieldChanged(formName);
		onFieldChanged = (...params) => {
			return dispatch(onChange(...params));
		};
	}

	const renderField = () => {
		switch (type) {
			case "select":
				return (
					<Select
						id={fieldName}
						onChange={
							isControlled &&
							((select) => {
								// if select field is disabled then do nothing
								if (props.disabled) return;

								if (props.multiple) {
									const selectedOptions = Array.from(
										select.selectedOptions
									);
									onFieldChanged(
										formField,
										selectedOptions.map((opt) => opt.value)
									);
								} else {
									onFieldChanged(formField, select.value);
								}
							})
						}
						name={fieldName}
						value={
							isControlled &&
							getNestedProperty(
								forms[formName]["data"],
								formField
							)
						}
						data-error={
							isControlled &&
							!!forms[formName]["errors"][formField]
						}
						{...props}
					/>
				);

			case "textarea":
				return (
					<textarea
						id={fieldName}
						onChange={
							isControlled &&
							(({ currentTarget: input }) => {
								// if textarea field is disabled then do nothing
								if (props.disabled) return;
								onFieldChanged(formField, input.value);
							})
						}
						name={fieldName}
						value={
							isControlled &&
							getNestedProperty(
								forms[formName]["data"],
								formField
							)
						}
						data-error={
							isControlled &&
							!!forms[formName]["errors"][formField]
						}
						{...props}
					/>
				);

			default:
				let inputValue;
				if (type === "radio") {
					inputValue = getNestedProperty(
						forms[formName]["data"],
						formField
					);
				}
				return (
					<Fragment>
						<Input
							id={fieldName}
							name={fieldName}
							value={
								isControlled &&
								(inputValue
									? inputValue
									: getNestedProperty(
											forms[formName]["data"],
											formField
									  ))
							}
							data-error={
								isControlled &&
								!!forms[formName]["errors"][formField]
							}
							type={type}
							className={className}
							datetype={className === "date" ? dateType : ""}
							onChange={
								(isControlled || type === "file"
									? true
									: undefined) &&
								(({ currentTarget: input }) => {
									// if input field is disabled or radio then do nothing
									if (type === "radio" || props.disabled)
										return;

									if (type !== "file") {
										onFieldChanged(formField, input.value);
									} else {
										onFieldChanged(
											formField,
											props.multiple
												? input.files
												: input.files[0]
										);
									}

									// addtonal onchange handler
									props.onChangeHandler &&
										props.onChangeHandler();
								})
							}
							checked={
								type === "radio"
									? inputValue === "1"
										? true
										: false
									: null
							}
							{...props}
						/>
						{type === "radio" && (
							<label
								htmlFor={fieldName}
								className="switch-btn"
								onClick={() => {
									onFieldChanged(
										formField,
										inputValue === "1" ? "0" : "1"
									);
								}}
							></label>
						)}
					</Fragment>
				);
		}
	};

	const renderLabel = () => (
		<label
			htmlFor={fieldName}
			className={(required ? "required " : "") + labelClass}
		>
			{label}
		</label>
	);

	const renderContent = () => (
		<Fragment>
			{label !== "" && !labelAfter && renderLabel()}
			{renderField()}
			{label !== "" && labelAfter && renderLabel()}
			{typeof htmlAfterField === "function"
				? htmlAfterField(fieldName)
				: htmlAfterField}
		</Fragment>
	);

	return unwrappedField ? (
		renderContent()
	) : (
		<div className={`field ${className}`}>{renderContent()}</div>
	);
};

FormField.defaultProps = {
	type: "text",
	label: "",
	className: "",
	labelClass: "",
	required: false,
	dateType: "",
	options: [],
	htmlAfterField: "",
	unwrappedField: false,
	name: "",
	labelAfter: false,
};

export default connect((state) => ({
	forms: state.forms,
}))(FormField);
