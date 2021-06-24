import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

const FormSideSection = ({
	required,
	label,
	children,
	submitBtn = false,
	deleteBtn = false,
	extraContent,
	...props
}) => {
	const [opened, setOpened] = useState(true);
	const widgetContent = useRef(null);

	useEffect(() => {
		if (opened) {
			$(widgetContent.current).slideDown(400);
		} else {
			$(widgetContent.current).slideUp(400);
		}
	}, [opened]);

	return (
		<section className="widget form radius" {...props}>
			<h3
				className={opened ? "" : "closed blur-shadow"}
				onClick={() => {
					setOpened(!opened);
				}}
			>
				<span className={required ? "required" : ""}>{label}</span>
			</h3>

			<div className="widget-content" ref={widgetContent}>
				{children}

				{submitBtn && (
					<button
						className="primary-btn focus-shadow radius"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							if (typeof submitBtn === "function") {
								submitBtn();
							} else {
								submitBtn.handler();
							}
						}}
					>
						{submitBtn.label || "Save Changes"}
					</button>
				)}

				{deleteBtn && (
					<button
						className="dark-btn focus-shadow radius"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							if (typeof deleteBtn === "function") {
								deleteBtn();
							} else {
								deleteBtn.handler();
							}
						}}
					>
						{deleteBtn.label || "Delete"}
					</button>
				)}

				{extraContent}
			</div>
		</section>
	);
};

FormSideSection.defaultProps = {
	id: "",
	required: false,
};

export default FormSideSection;
