import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "select2";
import "select2/dist/css/select2.min.css";

const Select2 = ({ data, options, value, onChange, ...attrs }) => {
	let el = useRef(null);

	useEffect(() => {
		const $el = $(el);
		$el.val(value);
		$el.select2(options);

		const handleChange = (e) => {
			onChange(e.target);
		};

		$el.on("select2:select select2:unselect", handleChange);

		return () => {
			$el.off("select2:select select2:unselect", handleChange);
			$el.select2("destroy");
		};
	}, [value, options]);

	return (
		<select {...attrs} ref={(elem) => (el = elem)}>
			{data.map(({ id, text, ...props }) => (
				<option key={id} {...props}>
					{text}
				</option>
			))}
		</select>
	);
};

export default Select2;
