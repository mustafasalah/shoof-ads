import * as ACTIONS from "./ActionTypes";

export const onWatchVideoFileDelete = (formType, resolution) => {
	return {
		type: ACTIONS.DELETE_WATCH_VIDEO_FILE,
		resolution,
		formType,
	};
};

export const onWatchVideoPlayerDelete = (formType, serverNo) => {
	return {
		type: ACTIONS.DELETE_WATCH_SERVER,
		serverNo,
		formType,
	};
};

export const onVideoFileDelete = (formType, videoNo) => {
	return {
		type: ACTIONS.DELETE_VIDEO_FILE,
		videoNo,
		formType,
	};
};
export const onVideoLinkDelete = (formType, videoInfoNo, serverNo) => ({
	type: ACTIONS.DELETE_VIDEO_LINK,
	videoInfoNo,
	serverNo,
	formType,
});

export const onVideoInfoDelete = (formType, videoInfoNo) => ({
	type: ACTIONS.DELETE_VIDEO_INFO,
	videoInfoNo,
	formType,
});
