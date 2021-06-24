import React from "react";
import Select2 from "../../../js/Select2";

const Select = ({ options, placeholder, tags, ...props }) => {
	return (
		<Select2
			{...props}
			data={options.map(({ label, value, ...props }, id) => ({
				id,
				text: label,
				value,
				...props,
			}))}
			options={{
				placeholder,
				tags,
				minimumResultsForSearch: 7,
			}}
		></Select2>
	);
};

export default Select;
