// const comments = [
import http from "./httpServices";
// 	{
// 		id: 1,
// 		content:
// 			"Awesome Anime!!.. The anime becomes more exciting!.. iam so hot to see the next season, and thanks mevid to release the episode as fast as possible ^_^",
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reply: {
// 			authorId: 1,
// 			author: "mohamed_mosa",
// 		},
// 		episodeId: 1,
// 		episodeNo: 1,
// 		showName: "Re:Zero kara Hajimeru Isekai Seikatsu",
// 		publishDate: "2019-08-23",
// 		status: "approved",
// 	},
// 	{
// 		id: 2,
// 		content: "Just I love this the anime ^_^",
// 		authorId: 1,
// 		author: "mustafa_salah",
// 		reply: {
// 			authorId: 3,
// 			author: "aliosman",
// 		},
// 		episodeId: 2,
// 		episodeNo: 2,
// 		showName: "Re:Zero kara Hajimeru Isekai Seikatsu",
// 		publishDate: "2019-08-28",
// 		status: "unapproved",
// 	},
// 	{
// 		id: 3,
// 		content: "thanks mevid to release the episode as fast as possible",
// 		authorId: 2,
// 		author: "mohamed_mosa",
// 		reply: null,
// 		episodeId: 4,
// 		episodeNo: 2,
// 		showName: "The Promisted Neverland",
// 		publishDate: "2019-09-02",
// 		status: "approved",
// 	},
// ];

export default async function getComments() {
	const comments = await http.get("/comments");
	return comments.data;
}
