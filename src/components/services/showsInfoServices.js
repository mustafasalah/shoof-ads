const rates = [
	{ label: "Not Rated", value: "" }, // mean: Not Rated
	{ label: "G", value: "g" },
	{ label: "PG", value: "pg" },
	{ label: "PG-13", value: "pg-13" },
	{ label: "R", value: "r" },
	{ label: "R+", value: "r+" },
	{ label: "NC-17", value: "nc-17" },
];

export function getRates() {
	return rates;
}

const rawTypes = [
	{ value: "blu-ray", label: "BluRay" },
	{ value: "web-dl", label: "WEB-DL" },
	{ value: "webrip", label: "WEBRip" },
	{ value: "hdtv", label: "HDTV" },
	{ value: "hdcam", label: "HDCAM" },
	{ value: "hdrip", label: "HDRip" },
	{ value: "hdtc", label: "HDTC" },
	{ value: "hdts", label: "HDTS" },
	{ value: "dvdrip", label: "DVDRip" },
	{ value: "dvdscr", label: "DVDScr" },
	{ value: "tvrip", label: "TVRip" },
];

export function getRawTypes() {
	return rawTypes;
}

const showStatus = [
	{ label: "Completed", value: "c" },
	{ label: "Airing", value: "a" },
	{ label: "Upcoming", value: "u" },
];

export function getShowStatus() {
	return showStatus;
}

const audioTypes = [
	{ label: "AAC", value: "AAC" },
	{ label: "AC3", value: "AC3" },
	{ label: "FLAC", value: "FLAC" },
	{ label: "MP3", value: "MP3" },
	{ label: "WAV", value: "WAV" },
];

export function getAudioType() {
	return audioTypes;
}

const animeSourceType = [
	{ label: "Manga", value: "manga" },
	{ label: "Web Manga", value: "web manga" },
	{ label: "Novel", value: "novel" },
	{ label: "Light Novel", value: "light novel" },
	{ label: "Visual Novel", value: "visual novel" },
	{ label: "Original", value: "original" },
	{ label: "Game", value: "game" },
	{ label: "Other", value: "other" },
];

export function getAnimeSource() {
	return animeSourceType;
}

const studios = [
	"Toei Animation",
	"Sunrise",
	"Production I.G",
	"Madhouse",
	"J.C.Staff",
	"TMS Entertainment",
	"Studio Deen",
	"Studio Pierrot",
	"OLM",
	"Nippon Animation",
	"A-1 Pictures",
	"Tatsunoko Production",
	"DLE",
	"Shin-Ei Animation",
	"Xebec",
	"Gonzo",
	"Shaft",
	"Bones",
	"Kyoto Animation",
	"Satelight",
	"Brain's Base",
	"Silver Link.",
	"Production Reed",
	"Gainax",
	"Arms",
	"Magic Bus",
	"Mushi Production",
	"Zexcs",
	"Doga Kobo",
	"Studio 4°C",
	"Studio Hibari",
	"feel.",
	"ufotable",
	"Seven",
	"Studio Comet",
	"Gallop",
	"LIDENFILMS",
	"Studio Ghibli",
	"Kachidoki Studio",
	"Diomedea",
	"Artland",
	"Lerche",
	"TNK",
	"P.A. Works",
	"Actas",
	"Ajia-Do",
	"Haoliners Animation League",
	"Wit Studio",
	"MAPPA",
	"Asahi Production",
];

export function getAnimeStudios() {
	return studios.map((studio) => ({ label: studio, value: studio }));
}
