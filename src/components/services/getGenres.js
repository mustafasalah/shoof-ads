import { upperFirst } from "../../js/Utility";

const genres = [
    "art and design",
    "business",
    "communities",
    "education",
    "entertainment",
    "games",
    "health and life",
    "telecom",
    "news",
    "shopping",
    "sport",
    "technique",
    "travel and tourism",
    "industries",
    "products",
    "transportation",
];

export default function getGenres() {
    return genres;
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
