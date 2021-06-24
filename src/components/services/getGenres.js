import { upperFirst } from "../../js/Utility";

const commonGenres = [
		"action",
		"adventure",
		"comedy",
		"drama",
		"fantasy",
		"history",
		"horror",
		"music",
		"romance",
		"sci-fi",
		"sport",
		"thriller",
	],
	movieGenres = [
		"animation",
		"biography",
		"crime",
		"documentary",
		"family",
		"film-noir",
		"game-show",
		"musical",
		"mystery",
		"news",
		"reality-tv",
		"talk-show",
		"war",
		"western",
	],
	animeGenres = [
		"cars",
		"dementia",
		"demons",
		"game",
		"historical",
		"josei",
		"kids",
		"magic",
		"martial arts",
		"mecha",
		"military",
		"parody",
		"police",
		"psychological",
		"samurai",
		"school",
		"seinen",
		"shoujo",
		"shoujo ai",
		"shounen",
		"shounen ai",
		"slice of life",
		"space",
		"super power",
		"supernatural",
		"vampire",
	];

export default function getGenres(showType = "shows") {
	showType = showType.toLowerCase();

	switch (showType) {
		case "tvshows":
		case "tv show":
		case "movies":
		case "movie":
			return [...commonGenres, ...movieGenres].sort();

		case "animes":
		case "anime":
			return [...commonGenres, ...animeGenres].sort();

		default:
			return [...commonGenres, ...movieGenres, ...animeGenres].sort();
	}
}

export const getGenresOptions = getGenres().map((genre) => ({
	label: upperFirst(genre),
	value: genre,
}));

export const genresUrlOptions = getGenresOptions.map((genre) => {
	return {
		...genre,
		value: `/browse/all/${window.encodeURIComponent(genre.value)}`,
	};
});
