import React from "react";
import { toast } from "react-toastify";
import http from "../components/services/httpServices";

const handleProgressUpload = (uploadMsg) => {
	let toastId = React.createRef();

	return {
		toastId,
		onUploadProgress: (p) => {
			const progress = p.loaded / p.total;

			// check if we already displayed a toast
			if (toastId.current === null) {
				toastId.current = toast(uploadMsg || "Upload in Progress", {
					progress: progress,
				});
			} else {
				toast.update(toastId.current, {
					progress: progress,
				});
			}
		},
	};
};

export const handleLogoImageUpload = async (logo, darkLogo) => {
	if (logo instanceof File || darkLogo instanceof File) {
		const formData = new FormData();
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading site logo images..."
		);

		logo instanceof File && formData.append("logo", logo);
		darkLogo instanceof File && formData.append("dark_logo", darkLogo);

		await http.post(`/upload/logo`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);
	}

	return Promise.resolve();
};

export const handleSiteBackgroundImageUpload = async (bg, darkBg) => {
	const formData = new FormData();

	if (bg instanceof File || darkBg instanceof File) {
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading site background images..."
		);

		bg instanceof File && formData.append("site_background", bg);
		darkBg instanceof File &&
			formData.append("dark_site_background", darkBg);

		await http.post(`/upload/background`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);
	}

	if (bg.delete || darkBg.delete) {
		bg.delete && formData.append("delete_site_background", "true");
		darkBg.delete && formData.append("delete_dark_site_background", "true");

		await http.post("/upload/background", formData);
	}

	return Promise.resolve();
};

export const handleFaviconImageUpload = async (favicon) => {
	const formData = new FormData();

	if (favicon instanceof File) {
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading favicon image..."
		);

		formData.append("favicon", favicon);

		await http.post(`/upload/favicon`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);
	}

	if (favicon.delete) {
		formData.append("delete_favicon", "true");
		await http.post("/upload/favicon", formData);
	}

	return Promise.resolve();
};

export const handleProfileImageUpload = async (user_id, avatar) => {
	const formData = new FormData();

	if (avatar instanceof File) {
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading profile image..."
		);

		formData.append("profile_image", avatar);

		await http.post(`/upload/profile-image/${user_id}`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);
	} else if (avatar.delete) {
		formData.append("profile_image_delete", "true");

		await http.post(`/upload/profile-image/${user_id}`, formData);
	}

	return Promise.resolve();
};

export const handleFileUpload = async ({ show_id, name }, value) => {
	const formData = new FormData();

	formData.append("show_name", name);

	if (value.poster) {
		formData.append("poster_image", value.poster);
	}

	if (value.background) {
		formData.append("background_image", value.background);
	}

	if (value.square_image) {
		if (value.square_image instanceof File) {
			formData.append("square_image", value.square_image);
		} else {
			formData.append("deleted_square_image", "true");
		}
	}

	const { onUploadProgress, toastId } = handleProgressUpload(
		"Uploading Poster & Background images..."
	);

	await http.post(`/upload/${show_id}`, formData, {
		onUploadProgress,
	});

	setTimeout(() => toast.done(toastId.current), 250);

	return Promise.resolve();
};

export const handleGalleryDelete = async ({ show_id }, images) => {
	const formData = new FormData();

	for (let image of images) {
		formData.append("deleted_gallery_images[]", image.url);
	}

	return http.post(`/upload/${show_id}`, formData);
};

export const handleGalleryUpload = async ({ show_id, name }, images) => {
	const formData = new FormData();
	formData.append("show_name", name);

	for (let image of images) {
		formData.append("gallery_images[]", image);
	}

	const { onUploadProgress, toastId } = handleProgressUpload(
		"Uploading gallery images..."
	);

	await http.post(`/upload/${show_id}`, formData, {
		onUploadProgress,
	});

	setTimeout(() => toast.done(toastId.current), 250);

	return Promise.resolve();
};

export const handleVideosFilesUpload = async (
	{ show_id, name, episode_no },
	videosFiles
) => {
	// if there are no download servers for video files, do nothing
	if (
		!videosFiles.some((video_file) => {
			return video_file.download_servers.some(
				(server) => server.file || server.link
			);
		})
	) {
		return;
	}

	const formData = new FormData();
	let fileUploadFound = false;

	formData.append("show_name", name);
	episode_no && formData.append("episode_no", episode_no);

	for (let videoFile of videosFiles) {
		// Skip not saved deleted video files
		if (videoFile.id === undefined && videoFile.delete) continue;

		formData.append("videos_info[]", JSON.stringify(videoFile));

		if (
			videoFile.download_servers[0].file &&
			videoFile.download_servers[0].file instanceof File
		) {
			fileUploadFound = true;

			formData.append(
				videoFile.download_servers[0].id
					? "updated_videos_files[]"
					: "videos_files[]",
				videoFile.download_servers[0].file
			);
		}
	}

	if (fileUploadFound) {
		const { onUploadProgress, toastId } = handleProgressUpload(
			"Uploading video files..."
		);

		await http.post(`/upload/videos/${show_id}`, formData, {
			onUploadProgress,
		});

		setTimeout(() => toast.done(toastId.current), 250);

		return Promise.resolve();
	}

	return http.post(`/upload/videos/${show_id}`, formData);
};

export const handleWatchingVideoUpload = async (
	{ show_id, name, episode_no },
	video
) => {
	// if there are no files uploaded
	if (!video.files) return;

	const formData = new FormData();
	let uploadFile = false,
		changeFound = false;

	formData.append("show_name", name);
	formData.append("server_name", video.name);

	episode_no && formData.append("episode_no", episode_no);
	video.id && formData.append("server_id", video.id);

	for (let res in video.files) {
		if (video.files[res].id) {
			if (video.files[res].delete) {
				formData.append(res + "_delete", video.files[res].id);
				changeFound = true;
			}
		} else {
			changeFound = uploadFile = true;
			formData.append(res, video.files[res]);
		}
	}

	if (changeFound) {
		if (uploadFile) {
			const { onUploadProgress, toastId } = handleProgressUpload(
				"Uploading watch video files..."
			);

			await http.post(`/upload/watching-videos/${show_id}`, formData, {
				onUploadProgress,
			});

			setTimeout(() => toast.done(toastId.current), 250);
		} else {
			await http.post(`/upload/watching-videos/${show_id}`, formData);
		}
	}

	return Promise.resolve();
};
