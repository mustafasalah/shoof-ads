import Quill from "quill";
import "../css/quill.snow.css";

const toolbarOptions = [
		[{ header: [3, 4, 5, 6, false] }],
		[{ size: ["small", false, "large", "huge"] }], // custom dropdown
		["bold", "italic", "underline", "strike"], // toggled buttons
		["blockquote", "code-block"],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ direction: "rtl" }], // text direction

		["link", "image", "video"], // link & Media

		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ align: [] }],

		["clean"], // remove formatting button
	],
	options = {
		bounds: "#page-editor",
		debug: "info",
		modules: {
			toolbar: toolbarOptions,
		},
		placeholder: "The page content here...",
		theme: "snow",
	};

export default function runQuillEditor() {
	return new Quill(document.getElementById("page-html-editor"), options);
}
