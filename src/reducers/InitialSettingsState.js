const initialSettingsState = {
	data: {
		id: "",
		site_name: "",
		home_page_title: "",
		keywords: "",
		description: "",
		site_content: ["movies", "anime", "tvshows"],
		comments_enabled: "1",
		reviews_enabled: "1",
		comments_supervisor: "1",
		reviews_supervisor: "1",
		registeration_enabled: "1",
		dark_mode: "0",
		default_language: "en",
		fb_app_id: "",
		fb_app_secret: "",
		tw_app_id: "",
		tw_app_secret: "",
		facebook: {
			url: "",
			counter: "",
		},
		twitter: {
			url: "",
			counter: "",
		},
		instagram: {
			url: "",
			counter: "",
		},
		youtube: {
			url: "",
			counter: "",
		},
		captcha_site_key: "",
		captcha_secret_key: "",
		favicon: "",
		site_background: "",
		dark_site_background: "",
		logo: {},
		dark_logo: {},
	},
	errors: {},
};

export default initialSettingsState;
