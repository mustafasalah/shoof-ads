import joi from "@hapi/joi";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
	getAudioType,
	getRawTypes,
} from "../components/services/showsInfoServices";

const generalSchema = {
	id: joi.number().integer().min(1).empty(""),
};

const publishSchema = {
	publish_date: joi
		.object({
			date: joi.date().raw(true).label("Publish Date"),
			time: joi
				.string()
				.regex(/\d{1,2}:\d{1,2}(:\d{1,2})?/)
				.messages({
					"string.pattern.base": "Invalid time value syntax",
				})
				.label("Publish Time")
				.empty(""),
		})
		.with("time", "date")
		.empty({ date: "", time: "" }),
	published: joi.allow("0", "1").required(),
	author: joi.number().integer().positive().required(),
	keywords: joi.string().max(500).empty(""),
	description: joi.string().max(255).empty(""),
};

export const menuSchema = {
	...generalSchema,
	type: joi
		.allow("link", "category", "page", "genre", "tag")
		.empty("")
		.required(),
	label: joi.string().empty("").required().label("Label"),
	link: joi
		.string()
		.uri({ allowRelative: true, allowQuerySquareBrackets: true })
		.required(),
};

export const subMenuSchema = {
	...generalSchema,
	...menuSchema,
	nested_in: joi.number().integer().required(),
};

export const pageSchema = {
	...generalSchema,
	...publishSchema,
	title: joi.string().required().empty("").label("Page Title"),
	content: joi.string().required().empty("").label("Page Content"),
};

export const userSchema = {
	...generalSchema,
	username: joi
		.string()
		.regex(/^[a-zA-Z]\w+$/)
		.empty("")
		.messages({
			"string.pattern.base":
				"The username can contain only english letters, digits and underscore(_), and must start with english letter.",
		}),
	email: joi
		.string()
		.email({ tlds: { allow: false } })
		.empty("")
		.required(),
	password: joi.string().min(6).max(20).empty("").required(),
	confirm_password: joi.ref("password"),
	first_name: joi.string().min(2).empty("").required(),
	last_name: joi.string().min(2).empty(""),
	age: joi.number().integer().min(10).max(100).empty(""),
	gender: joi.allow("m", "f").empty(""),
	country: joi.string().empty(""),
	avatar: joi.object().empty(""),
	role: joi.allow("user", "supervisor", "publisher", "admin").required(),
	banned: joi.allow("1", "0").required(),
	email_verification: joi.allow("1", "0").required(),
	about: joi.string().empty(""),
	social_accounts: joi.object({
		facebook: joi.string().uri().empty(""),
		twitter: joi.string().uri().empty(""),
		instagram: joi.string().uri().empty(""),
		youtube: joi.string().uri().empty(""),
	}),
};

const mediaSchema = {
	duration: joi
		.string()
		.pattern(/^\s*(\d+\s?hours?)?\s*\d+\s?min(ute)?s?\s*$/)
		.empty("")
		.label("Duration"),
	release_date: joi.date().empty("").raw(true),
	story: joi.string().required(),
	watching_servers: joi.array().items(
		joi
			.object({
				id: joi.number().integer(),
				name: joi.string().empty(""),
				code: joi.string().empty(""),
				files: joi.object().empty({}),
			})
			.with("code", "name")
			.with("files", "name")
	),
	video_files: joi.array().items(
		joi.object({
			delete: joi.bool().empty(""),
			id: joi.number().integer().min(1).empty(""),
			raw_type: joi.allow(...getRawTypes().map((raw) => raw.value)),
			resolution: joi.number().integer().positive(),
			size: joi.string().empty(""),
			audio: joi.allow(...getAudioType().map((audio) => audio.value)),
			language: joi.string().empty("").default("English"),
			subtitle: joi.string().empty(""),
			translator: joi.string().empty(""),
			download_servers: joi.array().items(
				joi
					.object({
						id: joi.number().integer().min(1).empty(""),
						name: joi.string().empty("").label("Server Name"),
						link: joi
							.string()
							.uri()
							.empty("")
							.label("Download Link"),
						file: joi.object().empty(null).label("Video File"),
						delete: joi.bool().empty(""),
					})
					.empty({})
					.with("link", "name")
					.with("file", "name")
			),
		})
	),
};

export const layoutSchema = {
	...generalSchema,
	title: joi.string().min(2).empty(""),
	type: joi.string().required(),
	position: joi.string(),
	widgetType: joi.string(),
	settings: joi.object({
		category: joi.any(),
		genres: joi.any(),
		tag: joi.any(),
		order: joi.allow("latest", "oldest", "views", "rates"),
		shows_no: joi.number().integer().min(1),
		icons: joi.allow("film", "star", "crown", "heart", "fire"),
		links: joi.array(),
		content: joi.string().empty(""),
	}),
	enabled: joi.allow("1", "0"),
	deletable: joi.allow("1", "0"),
};

export const episodeSchema = {
	...generalSchema,
	...publishSchema,
	...mediaSchema,
	story: joi.string().empty(""),
	show_id: joi.number().integer().min(1).empty("").required(),
	title: joi.string().empty("").label("Episode Title"),
	episode_no: joi.number().min(0).required().label("Episode Number"),
	episode_arc: joi.number().integer().min(1).label("Episode Arc").empty(""),
	comments_enabled: joi.allow("0", "1").required(),
};

export const showSchema = {
	...generalSchema,
	...publishSchema,
	...mediaSchema,
	type: joi.allow("movie", "anime", "tvshow").empty("").required(),
	name: joi.string().required().empty("").label("Show Name"),
	another_name: joi.string().empty("").label("Another Name"),
	genres: joi.array().min(1).required().label("Genres"),
	release_year: joi
		.number()
		.integer()
		.min(1800)
		.required()
		.label("Release Year"),
	score: joi.number().min(1).max(10).empty("").required().label("Score"),
	rate: joi
		.any()
		.allow(...getRates().map((rate) => rate.value))
		.required(),
	season: joi.number().integer().min(1).empty("").label("Season No"),
	episodes: joi.number().integer().min(1).empty("").label("Episodes No"),
	status: joi
		.any()
		.allow(...getShowStatus().map((status) => status.value))
		.required(),
	source: joi.any().allow(...getAnimeSource().map((source) => source.value)),
	studio: joi
		.any()
		.allow("n/a", ...getAnimeStudios().map((studio) => studio.value)),
	related_shows: joi.array().items(joi.string()),
	aired_from: joi.date().empty("").raw(true),
	aired_to: joi.date().empty("").raw(true),
	imdb_link: joi.string().uri().empty(""),
	mal_link: joi.string().uri().empty(""),
	poster: joi.object().empty("").label("Poster Image").required(),
	background: joi.object().empty("").label("Background Image").required(),
	square_image: joi.object().empty("").label("Square Image"),
	trailer_link: joi.string().uri().empty("").label("Trailer Link"),
	tags: joi.array(),
	reviews_enabled: joi.allow("0", "1").required(),
	gallery: joi.array(),
	arcs: joi.object({
		form: joi.object(),
		list: joi
			.array()
			.unique((a, b) => a.no == b.no)
			.messages({ "array.unique": "Arc No. should not be duplicated" }),
	}),
};

const social_url_joi_schema = joi.string().uri().empty("");

const social_counter_joi_schema = joi
	.string()
	.pattern(/^\d+(\.\d+)?( ?[km])?$/i)
	.empty("")
	.messages({
		"string.pattern.base":
			"The value must be number only or number followed by 'K' or 'M' character.",
	});

const social_account_joi_schema = joi
	.object({
		url: social_url_joi_schema,
		counter: social_counter_joi_schema,
	})
	.with("counter", "url")
	.required();

export const settingsSchema = {
	...generalSchema,
	site_name: joi.string().empty("").required().label("Site Name"),
	home_page_title: joi.string().empty("").required().label("Home Page Title"),
	keywords: joi.string().empty("").required(),
	description: joi.string().empty("").required(),
	site_content: joi
		.array()
		.items(joi.allow("movies", "anime", "tvshows"))
		.min(1)
		.max(3)
		.required()
		.label("Site Content Type"),
	comments_enabled: joi.allow("0", "1").required(),
	reviews_enabled: joi.allow("0", "1").required(),
	comments_supervisor: joi.allow("0", "1").required(),
	reviews_supervisor: joi.allow("0", "1").required(),
	registeration_enabled: joi.allow("0", "1").required(),
	dark_mode: joi.allow("0", "1").required(),
	default_language: joi.string().length(2).empty("").required(),
	fb_app_id: joi.string().empty(""),
	fb_app_secret: joi.string().empty(""),
	tw_app_id: joi.string().empty(""),
	tw_app_secret: joi.string().empty(""),
	facebook: social_account_joi_schema,
	twitter: social_account_joi_schema,
	instagram: social_account_joi_schema,
	youtube: social_account_joi_schema,
	pinterest: social_account_joi_schema,
	linkedin: social_account_joi_schema,
	reddit: social_account_joi_schema,
	tiktok: social_account_joi_schema,
	dribbble: social_account_joi_schema,
	flickr: social_account_joi_schema,
	twitch: social_account_joi_schema,
	soundcloud: social_account_joi_schema,
	vk: social_account_joi_schema,
	telegram: social_account_joi_schema,
	snapchat: social_account_joi_schema,
	patreon: social_account_joi_schema,
	captcha_site_key: joi.string().empty(""),
	captcha_secret_key: joi.string().empty(""),
	favicon: joi.object().empty(""),
	site_background: joi.object().empty(""),
	dark_site_background: joi.object().empty(""),
	logo: joi.object().required(),
	dark_logo: joi.object().required(),
};

export const schema = {
	...episodeSchema,
	...showSchema,
	...userSchema,
	...settingsSchema,
};

const social_accounts_joi_schema = joi.string().uri().empty("");

export const nestedSchema = {
	settings_category: joi.any(),
	settings_genres: joi.any(),
	settings_tag: joi.any(),
	settings_order: joi.allow("latest", "oldest", "views", "rates"),
	settings_shows_no: joi.number().integer().min(1),
	settings_icons: joi.allow("film", "star", "crown", "heart", "fire"),
	settings_links: joi.array(),
	settings_content: joi.string().empty(""),
	twitter_counter: social_counter_joi_schema,
	youtube_counter: social_counter_joi_schema,
	instagram_counter: social_counter_joi_schema,
	facebook_counter: social_counter_joi_schema,
	pinterest_counter: social_counter_joi_schema,
	linkedin_counter: social_counter_joi_schema,
	reddit_counter: social_counter_joi_schema,
	tiktok_counter: social_counter_joi_schema,
	dribbble_counter: social_counter_joi_schema,
	flickr_counter: social_counter_joi_schema,
	twitch_counter: social_counter_joi_schema,
	soundcloud_counter: social_counter_joi_schema,
	vk_counter: social_counter_joi_schema,
	telegram_counter: social_counter_joi_schema,
	snapchat_counter: social_counter_joi_schema,
	patreon_counter: social_counter_joi_schema,
	twitter_url: social_url_joi_schema,
	instagram_url: social_url_joi_schema,
	youtube_url: social_url_joi_schema,
	facebook_url: social_url_joi_schema,
	pinterest_url: social_url_joi_schema,
	linkedin_url: social_url_joi_schema,
	reddit_url: social_url_joi_schema,
	tiktok_url: social_url_joi_schema,
	dribbble_url: social_url_joi_schema,
	flickr_url: social_url_joi_schema,
	twitch_url: social_url_joi_schema,
	soundcloud_url: social_url_joi_schema,
	vk_url: social_url_joi_schema,
	telegram_url: social_url_joi_schema,
	snapchat_url: social_url_joi_schema,
	patreon_url: social_url_joi_schema,
	social_accounts_facebook: social_accounts_joi_schema,
	social_accounts_twitter: social_accounts_joi_schema,
	social_accounts_instagram: social_accounts_joi_schema,
	social_accounts_youtube: social_accounts_joi_schema,
	social_accounts_pinterest: social_accounts_joi_schema,
	social_accounts_linkedin: social_accounts_joi_schema,
	social_accounts_reddit: social_accounts_joi_schema,
	social_accounts_tiktok: social_accounts_joi_schema,
	social_accounts_dribbble: social_accounts_joi_schema,
	social_accounts_flickr: social_accounts_joi_schema,
	social_accounts_twitch: social_accounts_joi_schema,
	social_accounts_soundcloud: social_accounts_joi_schema,
	social_accounts_vk: social_accounts_joi_schema,
	social_accounts_telegram: social_accounts_joi_schema,
	social_accounts_snapchat: social_accounts_joi_schema,
	social_accounts_patreon: social_accounts_joi_schema,
	publish_date_date: joi.date().required().raw(true),
	publish_date_time: joi.string().regex(/\d{1,2}:\d{1,2}(:\d{1,2})?/),
	watching_servers_name: joi.string(),
	watching_servers_code: joi.string(),
	video_files_raw_type: joi.string(),
	video_files_resolution: joi.number().integer().positive(),
	video_files_size: joi.string().empty(""),
	video_files_audio: joi.allow(...getAudioType().map((audio) => audio.value)),
	video_files_language: joi.string().empty(""),
	video_files_subtitle: joi.string().empty(""),
	video_files_translator: joi.string().empty(""),
	video_files_download_servers_name: joi.string(),
	video_files_download_servers_link: joi.string().uri(),
	arcs_form_no: joi.number().integer().positive().min(1),
	arcs_form_name: joi.string().empty(""),
};
