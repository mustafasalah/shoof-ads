import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import AddMoreBtn from "./AddMoreBtn";
import ServerField from "./ServerField";
import VideoFileField from "./VideoFileField";
import FormSideSection from "./../common/form/FormSideSection";
import PublishFields from "./PublishFields";
import episodeFormActions from "./../../actions/EpisodeFormActions";
import getEpisodes from "../services/episodesServices";
import { getShowArcs } from "../services/showsServices";
import Loader from "./../common/Loader";
import { authorize } from "./../../js/Utility";
import getDataActions from "./../../actions/DataActions";

const EpisodeForm = ({
	loggedUser,
	data,
	shows,
	onSubmit,
	onReset,
	onEpisodeDataLoad,
	onShowIdChange,
	deleteEpisodeHandler,
}) => {
	const history = useHistory();
	const params = useParams();
	const [showArcs, setShowArcs] = useState([]);
	const episodeId = params.id && Number(params.id);

	// validate the show id format
	if (typeof episodeId === "number" && !Number.isInteger(episodeId)) {
		history.replace("/");
	}

	useEffect(() => {
		(async () => {
			if (episodeId === undefined) return onReset(history.location.state);
			try {
				const episodeData = await getEpisodes(episodeId);

				// Authorize this page
				if (
					!authorize(loggedUser.role, "supervisor") &&
					!(
						loggedUser.role === "publisher" &&
						loggedUser.id === +episodeData.author
					)
				) {
					history.replace("/ads");
				}

				onEpisodeDataLoad(episodeData);
			} catch (ex) {
				toast.error("There is no ads with this id: " + episodeId, {
					autoClose: 2500,
					onClose: () => history.goBack(),
				});
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			// if there is no show selected do nothing
			if (data.show_id === "") return;

			// if there is show selected then get arcs
			// list for that shows and set it in form state
			try {
				setShowArcs(await getShowArcs(data.show_id));
			} catch (ex) {
				toast.error("There is no playlist with this id: " + data.show_id, {
					autoClose: 2500,
					onClose: () => history.goBack(),
				});
			}
		})();
	}, [data.show_id]);

	return (
		<Fragment>
			<SectionHeader
				name={`${episodeId ? "Edit" : "New"} Ad`}
				faClass={`fas ${episodeId ? "fa-edit" : "fa-plus fa-sm"}`}
			/>

			{episodeId && data.id === "" ? (
				<Loader />
			) : (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(data, () => {
							history.push("/ads/");
						});
					}}
				>
					<div id="main-side">
						<FormSection header="Ad Information">
							<div className="row">
								<div className="col-1">
									<FormField
										name="episode.show_id"
										label="Select Playlist"
										type="select"
										placeholder="Select Ad's Playlist"
										options={shows
											.filter(
												(show) =>
													show.category !== "movie"
											)
											.map((show) => ({
												label: show.name,
												value: show.id,
											}))}
										onChangeHandler={() => {
											// to reset episode arc field to nothing when the show of episode was changed
											onShowIdChange();
										}}
										disabled={episodeId}
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-3-2">
									<FormField
										name="episode.title"
										label="Ad Title"
										type="text"
										placeholder="e.g. The Pirates Of The Caribbean"
									/>
								</div>
								<div className="col-3-1">
									<FormField
										name="episode.episode_no"
										label="Ad No"
										type="number"
										min="0"
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-3-2">
									<div className="row">
										<div className="col-2">
											<FormField
												name="episode.duration"
												className="time"
												label="Duration"
												type="text"
												placeholder="XX hours XX min OR XX min"
											/>
										</div>
										<div className="col-2">
											<FormField
												name="episode.release_date"
												className="date"
												label="Release Date"
												type="text"
												dateType="date"
												autoComplete="off"
											/>
										</div>
									</div>
								</div>
								<div className="col-3-1">
									<FormField
										name="episode.episode_arc"
										label="Arc of Episode"
										type="select"
										placeholder="The arc of episode, if it have"
										options={showArcs.map((arc) => {
											return {
												label: arc.arc_name,
												value: arc.id,
											};
										})}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-1">
									<FormField
										name="episode.story"
										label="Description"
										type="textarea"
										placeholder="Something about Ad here..."
									/>
								</div>
							</div>
						</FormSection>

						<FormSection
							header="Watching Servers"
							faClass="fas fa-video"
							id="watching"
						>
							{data.watching_servers.map((server, i) => (
								<ServerField
									key={i}
									serverNo={i}
									formName="episode"
									value={server}
								/>
							))}
							<AddMoreBtn
								label="Add More Servers"
								formName="episode"
								listName="watching_servers"
							/>
						</FormSection>

						<FormSection
							header="Video Files and Download Link"
							faClass="far fa-file-video"
							id="video-files"
						>
							{data.video_files.map((video_file, i) => (
								<VideoFileField
									key={i}
									videoNo={i}
									formName="episode"
								/>
							))}

							<AddMoreBtn
								label="Add More Videos"
								formName="episode"
								listName="video_files"
							/>
						</FormSection>
					</div>

					<div id="end-side">
						<FormSideSection label="Publish" id="publish">
							<PublishFields
								form="episode"
								submitLabel={
									data.id ? "Save Changes" : "Create"
								}
								extraFields={[
									<FormField
										type="select"
										label="Comments"
										name="episode.comments_enabled"
										options={[
											{ label: "Enable", value: 1 },
											{ label: "Disable", value: 0 },
										]}
									/>,
								]}
								deleteBtn={
									data.id
										? {
											label: "Delete",
											handler: () => {
												const deleteIt = window.confirm(
													"Are you sure to delete this episode?"
												);
												deleteIt &&
													deleteEpisodeHandler(
														data.id
													);
												history.replace(
													"/ads"
												);
											},
										}
										: undefined
								}
							/>
						</FormSideSection>
					</div>
				</form>
			)}
		</Fragment>
	);
};

export default connect(
	(state) => ({
		...state.forms.episode,
		shows: state.shows,
		loggedUser: state.loggedUser,
	}),
	{
		onSubmit: episodeFormActions.onFormSubmit,
		onReset: episodeFormActions.onFormReset,
		onWatchVideoPlayerDelete: episodeFormActions.onWatchVideoPlayerDelete,
		onWatchVideoFileDelete: episodeFormActions.onWatchVideoFileDelete,
		onEpisodeDataLoad: episodeFormActions.onEpisodeDataLoad,
		onShowIdChange: episodeFormActions.onShowIdChange,
		deleteEpisodeHandler: getDataActions("episodes").deleteData,
	}
)(EpisodeForm);
