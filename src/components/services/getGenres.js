import { upperFirst } from "../../js/Utility";

const genres = [
    "art and design",
    "blogs",
    "business",
    "communities",
    "education",
    "entertainment",
    "toys",
    "health and life",
    "Internet",
    "news",
    "shopping",
    "sport",
    "technique",
    "travel and tourism",
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
