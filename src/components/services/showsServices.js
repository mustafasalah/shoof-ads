// const shows = [
// 	{
// 		id: 1,
// 		poster: "/assets/images/slider1.jpg",
// 		name: "How to train your dragon: the hidden world",
// 		category: "movie",
// 		genres: ["action", "comedy", "drama"],
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reviews: 4,
// 		status: "published",
// 		publishDate: "2019-07-12",
// 		views: 234,
// 	},
// 	{
// 		id: 2,
// 		poster: "/assets/images/slider2.jpg",
// 		name: "Pet Sematary",
// 		category: "movie",
// 		genres: ["action", "mystry", "horror"],
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reviews: 2,
// 		status: "published",
// 		publishDate: "2019-07-16",
// 		views: 233,
// 	},
// 	{
// 		id: 3,
// 		poster: "/assets/images/slider3.jpg",
// 		name: "Toy Story 3",
// 		category: "movie",
// 		genres: ["animation", "comedy", "adventure"],
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reviews: 12,
// 		status: "published",
// 		publishDate: "2019-08-18",
// 		views: 2145,
// 	},
// 	{
// 		id: 4,
// 		poster: "/assets/images/slider4.jpg",
// 		name: "The Amazing Spiderman 2",
// 		category: "movie",
// 		genres: ["animation", "romance", "adventure"],
// 		authorId: 1,
// 		author: "aliosman",
// 		reviews: 9,
// 		status: "drafted",
// 		publishDate: "2019-08-23",
// 		views: 2355,
// 	},
// 	{
// 		id: 5,
// 		poster: "/assets/images/rec3.jpg",
// 		name: "Incridables 3",
// 		category: "movies",
// 		genres: ["animation", "action", "adventure"],
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reviews: 2,
// 		status: "published",
// 		publishDate: "2019-08-29",
// 		views: 3409,
// 	},
// 	{
// 		id: 6,
// 		poster: "/assets/images/rec4.jpg",
// 		name: "ZooTopia",
// 		category: "movies",
// 		genres: ["animation", "comedy", "adventure"],
// 		authorId: 1,
// 		author: "mohamed_mosa",
// 		reviews: 12,
// 		status: "drafted",
// 		publishDate: "2019-09-13",
// 		views: 756,
// 	},
// ];

// const showData = {
// 	type: "movie",
// 	name: "The King of West",
// 	another_name: "ملك الغرب",
// 	genres: ["action", "fantasy"],
// 	release_year: "2020",
// 	score: "7",
// 	rate: "r+",
// 	duration: "1 hour 45 minutes",
// 	season: "",
// 	episodes: "",
// 	status: "a",
// 	source: "manga",
// 	studio: "n/a",
// 	related_shows: [4],
// 	release_date: "2020-06-12",
// 	aired_from: "",
// 	aired_to: "",
// 	story:
// 		"the king of West need power to get rid of eval people in his kingdom!",
// 	imdb_link: "http://www.imdb.com",
// 	mal_link: "",
// 	poster: {
// 		name: "The_King_of_West_poster.jpg",
// 		size: "948347",
// 		url: "/assets/images/anime6.jpg",
// 	},
// 	background: {
// 		name: "The_King_of_West_background.jpg",
// 		size: "5548347",
// 		url: "/assets/images/strange.jpg",
// 	},
// 	square_image: {
// 		name: "The_King_of_West_square_image.jpg",
// 		size: "848745",
// 		url: "/assets/images/slider1.jpg",
// 	},
// 	trailer_link: "https://www.youtube.com",
// 	tags: ["HBO Shows"],
// 	published: 1,
// 	reviews_enabled: 1,
// 	author: 23,
// 	keywords: "movie,action,drama,best movie 2020",
// 	description:
// 		"download and watch the king of west in 1080p bluray for free!",
// 	gallery: [
// 		{ url: "/assets/images/gallery/1.jpg" },
// 		{ url: "/assets/images/gallery/2.jpg" },
// 		{ url: "/assets/images/gallery/3.jpg" },
// 		{ url: "/assets/images/gallery/4.jpg" },
// 		{ url: "/assets/images/gallery/5.jpg" },
// 	],
// 	arcs: {
// 		form: {
// 			id: "",
// 			key: "",
// 			no: "",
// 			name: "",
// 		},
// 		list: [],
// 	},
// 	watching_servers: [
// 		{
// 			id: 0,
// 			name: "MEVid Server",
// 			files: {
// 				"1080P": { id: "1" },
// 				"720P": { id: "2" },
// 				"360P": { id: "3" },
// 			},
// 		},
// 		{ id: 1, name: "Google Drive", code: "code here..." },
// 		{ id: 2, name: "UptoBox", code: "uptobox code here..." },
// 	],
// 	video_files: [
// 		{
// 			raw_type: "blu-ray",
// 			resolution: "1080",
// 			size: "1.9GB",
// 			audio: "FLAC",
// 			language: "English",
// 			subtitle: "Arabic",
// 			translator: "HeroKan",
// 			download_servers: [
// 				{
// 					name: "Direct Link",
// 					file: {
// 						id: "1",
// 						name: "The_king_of_west_[BLU-RAY]_[1080P].mp4",
// 						size: "1924000000",
// 					},
// 				},
// 				{ name: "google drive", link: "https://drive.google.com/" },
// 				{ name: "mega", link: "https://mega.co.nz/" },
// 			],
// 		},
// 		{
// 			raw_type: "blu-ray",
// 			resolution: "720",
// 			size: "1.1GB",
// 			audio: "AAC",
// 			language: "English",
// 			subtitle: "",
// 			translator: "",
// 			download_servers: [
// 				{
// 					name: "Direct",
// 					file: {
// 						id: "3",
// 						name: "The_king_of_west_[BLU-RAY]_[720P].mp4",
// 						size: "1129000000",
// 					},
// 				},
// 				{ name: "samaup", link: "https://www.samaup.com/" },
// 				{ name: "onedrive", link: "https://www.onedrive.com/" },
// 			],
// 		},
// 	],
// };
import http from "./httpServices";

export async function getShowArcs(show_id) {
	const repsonse = await http.get(`/arcs/${show_id}`);
	return repsonse.data;
}

export default async function getShows(id) {
	const shows = await http.get(`/shows/${id || ""}`);
	return shows.data;
}
