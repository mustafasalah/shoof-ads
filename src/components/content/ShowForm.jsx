import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SectionHeader from "../common/SectionHeader";
import { upperFirst } from "./../../js/Utility";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import getGenres from "./../services/getGenres";
import {
	getRates,
	getShowStatus,
	getAnimeSource,
	getAnimeStudios,
} from "./../services/showsInfoServices";
import AddMoreBtn from "./AddMoreBtn";
import ServerField from "./ServerField";
import VideoFileField from "./VideoFileField";
import FormSideSection from "./../common/form/FormSideSection";
import PosterField from "./PosterField";
import BackgroundField from "./BackgroundField";
import SquareImageField from "./SquareImageField";
import PublishFields from "./PublishFields";
import Gallery from "./Gallery";
import Arcs from "./Arcs";
import TagsField from "./TagsField";
import showFormActions from "./../../actions/ShowFormActions";
import getShows from "../services/showsServices";
import Loader from "./../common/Loader";
import { authorize } from "../../js/Utility";
import getDataActions from "./../../actions/DataActions";

const paramTypeToDataType = new Map([
	["movies", "movie"],
	["anime", "anime"],
	["playlists", "Playlist"],
]);

const typeDataToLabel = new Map([
	["movie", "Movie"],
	["anime", "Anime"],
	["tvshow", "Playlist"],
]);

const typeParamToLabel = new Map([
	["movies", "Movie"],
	["anime", "Anime"],
	["playlists", "Playlist"],
]);

const ShowForm = ({
	loggedUser,
	shows,
	data,
	onSubmit,
	onReset,
	onChange,
	onTypeChange,
	onShowImageDelete,
	onShowDataLoad,
	deleteShowHandler,
}) => {
	const history = useHistory();
	const params = useParams();
	const showType =
		typeParamToLabel.get(params.type) || typeDataToLabel.get(data.type);
	const showId = params.id && Number(params.id);
	let isMovie, isAnime, isTVShow;

	console.log(params.type);

	// validate the show id is integer number
	if (typeof showId === "number" && !Number.isInteger(showId)) {
		history.replace("/");
	}

	if (showType) {
		isMovie = showType === "Movie";
		isAnime = showType === "Anime";
		isTVShow = showType === "Playlist";
	}

	useEffect(() => {
		(async () => {
			// To reset form fields to its default value
			// (if the user edit show and then go to new one this will delete edited show state)
			if (showId === undefined) {
				onReset();
				onTypeChange(paramTypeToDataType.get(params.type));
				return;
			}

			// loading show data from server side and set it in form state
			try {
				const showData = await getShows(showId);

				// Authorize this page
				if (
					!authorize(loggedUser.role, "supervisor") &&
					loggedUser.id !== +showData.author
				) {
					history.replace("/shows");
				}

				onShowDataLoad(showData);
			} catch (ex) {
				toast.error("There is no show with this id: " + showId, {
					autoClose: 2500,
					onClose: () => history.goBack(),
				});
			}
		})();
	}, []);

	// change the show type in status according to type in url
	useEffect(() => {
		if (params.type) {
			const currentShowType = paramTypeToDataType.get(params.type);
			if (data.type !== currentShowType) onTypeChange(currentShowType);
		}
	}, [params.type]);

	return (
		<Fragment>
			<SectionHeader
				name={`${showId ? "Edit" : "New"} ${showType || "Show"}`}
				faClass={`fas ${showId ? "fa-edit" : "fa-plus fa-sm"}`}
			/>
			{showType === undefined ? (
				<Loader />
			) : (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(data, () => {
							history.push("/shows/");
						});
					}}
				>
					<div id="main-side">
						<FormSection header={`${showType} Information`}>
							<div className="row">
								<div className="col-3-2">
									<FormField
										name="show.name"
										label={`${showType} Name`}
										type="text"
										placeholder="e.g. The Pirates Of The Caribbean"
										required
									/>
								</div>
								<div className="col-3-1">
									<FormField
										name="show.genres"
										label="Genres"
										type="select"
										placeholder="Select Genres"
										options={getGenres(showType).map(
											(genre) => ({
												label: upperFirst(genre),
												value: genre,
											})
										)}
										multiple
										required
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-3-2">
									<FormField
										label="Another Name"
										placeholder="e.g. The name of the playlist in other language"
										name="show.another_name"
										type="text"
									/>
								</div>
								<div className="col-3-1">
									{isMovie ? (
										<FormField
											name="show.duration"
											className="time"
											label="Duration"
											type="text"
											placeholder="XX hours XX min OR XX min"
										/>
									) : (
										<FormField
											name="show.season"
											label="Season No."
											type="number"
											min="1"
											placeholder="default: none"
										/>
									)}
								</div>
							</div>

							<div className="row">
								<div className="col-3-2">
									<div className="row">
										<div className="col-2">
											<FormField
												name="show.release_year"
												className="date"
												label="Release Year"
												type="number"
												placeholder="e.g. 2020"
												dateType="year"
												autoComplete="off"
												required
											/>
										</div>
										<div className="col-2">
											<FormField
												name="show.score"
												label="Score"
												type="number"
												placeholder="e.g. 9"
												style={{ width: 110 }}
												required
												htmlAfterField={
													<span className="appendix">
														of 10
													</span>
												}
											/>
										</div>
									</div>
								</div>

								<div className="col-3-1">
									<FormField
										name="show.rate"
										label="Rate"
										type="select"
										defaultValue=""
										options={getRates()}
									/>
								</div>
							</div>
							{!isMovie && (
								<div className="row">
									<div className="col-3-2">
										<div className="row">
											<div
												className={
													isAnime ? "col-3" : "col-2"
												}
											>
												<FormField
													name="show.episodes"
													label="Ads Number"
													type="number"
													placeholder="e.g. 12"
													min="0"
												/>
											</div>
											<div
												className={
													isAnime ? "col-3" : "col-2"
												}
											>
												<FormField
													name="show.status"
													label="Airing Status"
													type="select"
													options={getShowStatus()}
												/>
											</div>
											{isAnime && (
												<div className="col-3">
													<FormField
														name="show.source"
														label="Source Type"
														type="select"
														defaultValue="manga"
														options={getAnimeSource()}
													/>
												</div>
											)}
										</div>
									</div>
									<div className="col-3-1">
										{isAnime ? (
											<FormField
												name="show.studio"
												label="Studios"
												type="select"
												defaultValue="N/A"
												options={[
													{
														label: "N/A",
														value: "n/a",
													},
													...getAnimeStudios(),
												]}
												tags
											/>
										) : (
											<FormField
												name="show.release_date"
												className="date"
												label="Release Date"
												type="text"
												dateType="date"
												autoComplete="off"
											/>
										)}
									</div>
								</div>
							)}
							<div className="row">
								<div className={isMovie ? "col-3-2" : "col-2"}>
									<FormField
										name="show.related_shows"
										className="shows"
										label="Related Shows"
										type="select"
										placeholder="Enter Related Shows..."
										options={shows.map((show) => ({
											label: show.name,
											value: show.id,
										}))}
										multiple
									/>
								</div>

								{isMovie ? (
									<div className="col-3-1">
										<FormField
											name="show.release_date"
											dateType="date"
											className="date"
											label="Release Date"
											type="text"
											autoComplete="off"
										/>
									</div>
								) : isAnime ? (
									<Fragment>
										<div className="col-2">
											<div className="row">
												<div className="col-2">
													<FormField
														name="show.aired_from"
														className="date"
														label="Aired from"
														type="text"
														autoComplete="off"
														dateType="date-from"
													/>
												</div>
												<div className="col-2">
													<FormField
														name="show.aired_to"
														className="date"
														label="Aired to"
														type="text"
														autoComplete="off"
														dateType="date-to"
													/>
												</div>
											</div>
										</div>
									</Fragment>
								) : (
									<div className="col-2">
										<FormField
											name="show.imdb_link"
											className="url"
											label="IMDB Link"
											type="url"
											placeholder="IMDB Link here..."
										/>
									</div>
								)}
							</div>
							<div className="row">
								<div className="col-1">
									<FormField
										name="show.story"
										label="Description"
										type="textarea"
										placeholder="Something about this playlist here..."
										required
									/>
								</div>
							</div>
							{!isTVShow && (
								<div className="row">
									<div className="col-2">
										<FormField
											name="show.imdb_link"
											className="url"
											label="IMDB Link"
											type="url"
											placeholder="IMDB Link here..."
										/>
									</div>
									<div className="col-2">
										<FormField
											name="show.mal_link"
											className="url"
											label="MyAnimeList Link"
											type="url"
											placeholder="MyAnimeList Link here..."
										/>
									</div>
								</div>
							)}
						</FormSection>

						<FormSection
							header="Gallery"
							faClass="far fa-images"
							id="gallery"
						>
							<Gallery
								gallery={data.gallery}
								showName={data.name}
								onChange={onChange}
							/>
						</FormSection>

						{isMovie && (
							<Fragment>
								<FormSection
									header="Watching Servers"
									faClass="fas fa-video"
									id="watching"
								>
									{data.watching_servers.map((server, i) => (
										<ServerField
											key={i}
											serverNo={i}
											formName="show"
											value={server}
										/>
									))}
									<AddMoreBtn
										label="Add More Servers"
										formName="show"
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
											formName="show"
										/>
									))}

									<AddMoreBtn
										label="Add More Videos"
										formName="show"
										listName="video_files"
									/>
								</FormSection>
							</Fragment>
						)}

						{isAnime && (
							<FormSection
								header="Anime Arcs"
								id="arcs"
								faClass="fas fa-folder"
							>
								<Arcs />
							</FormSection>
						)}
					</div>

					<div id="end-side">
						<FormSideSection
							label="Playlist Poster"
							id="show-poster-widget"
							required
						>
							<PosterField posterFile={data.poster} />
						</FormSideSection>

						<FormSideSection
							label="Playlist Background"
							id="show-background-widget"
							required
						>
							<BackgroundField backgroundFile={data.background} />
						</FormSideSection>

						<FormSideSection
							label="Square Image"
							id="show-square-image-widget"
						>
							<SquareImageField
								onDelete={onShowImageDelete}
								squareImageFile={data.square_image}
							/>
						</FormSideSection>

						<FormSideSection label="Trailer Link" id="trailer-link">
							<div className="row">
								<div className="col-1">
									<FormField
										type="url"
										name="show.trailer_link"
										placeholder="Enter YouTube Trailer Link here..."
										unwrappedField
										htmlAfterField={
											<small>
												you can also use any video
												sharing service like dailymotion
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection label="Tags" id="tags">
							<div className="row">
								<div className="col-1">
									<TagsField
										type="select"
										name="show.tags"
										placeholder="Press 'enter' after any tag you write"
										multiple
										tags
										unwrappedField
										htmlAfterField={
											<small>
												Used to group collection of
												playlists together under certain
												name
											</small>
										}
									/>
								</div>
							</div>
						</FormSideSection>

						<FormSideSection label="Publish" id="publish">
							<PublishFields
								form="show"
								submitLabel={
									data.id ? "Save Changes" : "Create"
								}
								extraFields={[
									<FormField
										type="select"
										label="Reviews"
										name="show.reviews_enabled"
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
													"Are you sure to delete this playlist?"
												);
												deleteIt &&
													deleteShowHandler(
														data.id
													);
												history.replace("/shows");
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
		...state.forms.show,
		shows: state.shows,
		loggedUser: state.loggedUser,
	}),
	{
		onSubmit: showFormActions.onFormSubmit,
		onChange: showFormActions.onFieldChanged,
		onReset: showFormActions.onFormReset,
		onTypeChange: showFormActions.onFormTypeChange,
		onShowImageDelete: showFormActions.onShowImageDelete,
		onShowDataLoad: showFormActions.onShowDataLoad,
		deleteShowHandler: getDataActions("shows").deleteData,
	}
)(ShowForm);
