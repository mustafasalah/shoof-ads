import React from "react";

const LinkForm = ({ form, onSubmit, onChange }) => {
	const { id, label, url } = form;
	const isUpdate = id !== null;
	const isFilled = label !== "" && url !== "";

	return (
		<div className="field">
			<label htmlFor="link-name">
				{isUpdate ? "Update" : "Add"} Link List
			</label>
			<div className="row radius" id="nested-form">
				<div className="col-1">
					<div className="field">
						<label htmlFor="link-name">Link Label</label>
						<input
							id="link-name"
							name="link-name"
							type="text"
							value={label}
							placeholder="e.g. Terms of Use"
							onChange={({ currentTarget: input }) => {
								onChange("label", input.value);
							}}
						/>
					</div>
				</div>
				<div className="col-1">
					<div className="field">
						<label htmlFor="link-url">Link URL</label>
						<input
							id="link-url"
							name="link-url"
							type="url"
							value={url}
							placeholder="e.g. http://www.mevid.com/terms-of-use"
							onChange={({ currentTarget: input }) => {
								onChange("url", input.value);
							}}
						/>
					</div>
				</div>
				<button
					type="button"
					id="links-list-button"
					className="dark-btn radius-3 focus-shadow"
					disabled={!isFilled}
					onClick={() => isFilled && onSubmit(form, isUpdate)}
				>
					{isUpdate ? "Update" : "Add"} Link
				</button>
			</div>
		</div>
	);
};

export default LinkForm;
