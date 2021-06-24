import $ from "jquery";

export default class LinksList {
	linksList = $("#current-links-list");
	form = $("#nested-form");
	nameInput = this.form.find("#link-name");
	urlInput = this.form.find("#link-url");
	submitBtn = this.form.find("button");
	urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

	constructor() {
		const { linksList, form, submitBtn } = this,
			self = this;
		linksList.on("click", ".move-btn", this.handleMove);
		linksList.on("click", ".delete-btn", this.handleDelete);
		linksList.on("click", ".edit-btn", function () {
			const link = $(this).parents("li").first().find("span.link-name");
			self.handleUpdate(link);
		});
		form.find("input").on("input", this.handleInput.bind(this));
		submitBtn.on("click", this.handleSubmit.bind(this));
	}

	handleUpdate(link) {
		const linkName = link.text(),
			linkUrl = link.data("url");
		const { nameInput, urlInput } = this;
		nameInput.val(linkName);
		urlInput.val(linkUrl);

		this.changeButtonState(true);
		this.changeFormState(true, link.parents("li").first());
	}

	changeFormState(isUpdate = false, updateLink) {
		const { form, submitBtn } = this;

		form.data("update", isUpdate);

		if (isUpdate) {
			form.data("update-link", updateLink);
			submitBtn.html("Update Link");
		} else {
			form.removeData("update-link");
			submitBtn.html("Add Link");
		}
	}

	handleDelete() {
		$(this).parents("li").first().remove();
	}

	handleInput() {
		if (this.checkCompleteForm() && this.checkUrlInput()) {
			this.changeButtonState(true);
		} else {
			this.changeButtonState();
		}
	}

	checkUrlInput() {
		const { urlInput, urlRegExp } = this;
		return urlRegExp.test(urlInput.val().trim());
	}

	handleSubmit() {
		const { linksList, nameInput, urlInput, form } = this;
		let lastLink = linksList.children(":last-child"),
			newLink = lastLink.clone();

		if (form.data("update")) {
			newLink = form.data("update-link");
		} else {
			lastLink.after(newLink);
		}

		newLink
			.find("span.link-name")
			.attr("data-url", urlInput.val())
			.html(nameInput.val());

		this.clearInputs();
	}

	changeButtonState(state = false) {
		this.submitBtn.prop("disabled", !state);
	}

	clearInputs() {
		const { nameInput, urlInput } = this;
		nameInput.val("");
		urlInput.val("");
		this.changeButtonState();
		this.changeFormState();
	}

	checkCompleteForm() {
		return this.form
			.find("input")
			.toArray()
			.every((input) => {
				return $(input).val().trim() !== "";
			});
	}

	handleMove() {
		const btn = $(this),
			link = btn.parents("li").first();

		if (btn.hasClass("up-btn")) {
			const prevLink = link.prev();
			if (prevLink.length === 0) return;
			prevLink.before(link);
		} else {
			const nextLink = link.next();
			if (nextLink.length === 0) return;
			nextLink.after(link);
		}
	}
}
