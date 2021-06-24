import http from "./httpServices";

// const reviews = [
// 	{
// 		id: 1,
// 		content:
// 			"Awesome Anime!!.. The anime becomes more exciting!.. iam so hot to see the next season, and thanks mevid to release the episode as fast as possible ^_^",
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		rate: 4,
// 		showId: 1,
// 		showName: "Re:Zero kara Hajimeru Isekai Seikatsu",
// 		publishDate: "2019-08-23",
// 		status: "approved",
// 	},
// ];

export default async function getReviews() {
	const reviews = await http.get("/reviews");
	return reviews.data;
}
