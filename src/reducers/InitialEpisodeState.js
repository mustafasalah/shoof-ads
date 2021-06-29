export const listItemsDefaults = {
	watching_servers: { name: "", code: "" },
	video_files: {
		raw_type: "blu-ray",
		resolution: "1080",
		size: "",
		audio: "AAC",
		language: "",
		subtitle: "",
		translator: "",
		download_servers: [
			{ name: "", file: null },
			{ name: "", link: "" },
		],
	},
	"video_files.download_servers": { name: "", link: "" },
};

const initialEpisodeState = {
	data: {
		id: "",
		show_id: "",
		title: "",
		episode_no: "",
		episode_arc: "",
		duration: "",
		release_date: "",
		story: "",
		aired_from: "",
		aired_to: "",
		repeat_times: 1,
		published: 1,
		publish_date: {
			date: "",
			time: "",
		},
		comments_enabled: 1,
		author: "",
		keywords: "",
		description: "",
		watching_servers: [
			{ name: "Shoof Ads", files: {} },
			// { name: "", code: "" },
		],
		video_files: [listItemsDefaults.video_files],
	},
	errors: {},
};

export default initialEpisodeState;
