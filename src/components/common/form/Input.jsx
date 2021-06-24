import React, { useEffect } from "react";
import runDatepicker from "./../../../js/Datepicker";

const Input = (props) => {
	let input;
	useEffect(() => {
		const { className, datetype, onChange } = props;
		if (className !== "date") return;
		runDatepicker(input, datetype, onChange);
	}, []);

	return <input ref={(el) => (input = el)} {...props} />;
};

export default Input;
