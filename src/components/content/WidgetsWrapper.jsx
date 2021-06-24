import React from "react";
import AboutWidget from "./../layoutWidgets/AboutWidget";
import AccountWidget from "../layoutWidgets/AccountWidget";
import AddWidget from "./../layoutWidgets/AddWidget";
import AdsWidget from "./../layoutWidgets/AdsWidget";
import CategoryWidget from "./../layoutWidgets/CategoryWidget";
import LinksListWidget from "./../layoutWidgets/LinksListWidget";
import RecentWidget from "./../layoutWidgets/RecentWidget";
import PickedShowsWidget from "./../layoutWidgets/PickedShowsWidget";
import SchedulerWidget from "./../layoutWidgets/SchedulerWidget";
import SearchWidget from "./../layoutWidgets/SearchWidget";
import SliderWidget from "./../layoutWidgets/SliderWidget";
import SocialMediaWidget from "./../layoutWidgets/SocialMediaWidget";

const WidgetsWrapper = ({ widget, onUpdate, onAddWidget, onDelete }) => {
	if (widget.type === undefined) return null;

	switch (widget.type) {
		case "add":
			return (
				<AddWidget
					position={widget.position}
					onSubmit={{
						label: "Add Widget",
						handler: () =>
							onAddWidget(widget.position, widget.widgetType),
					}}
				/>
			);

		case "slider":
			return <SliderWidget onSubmit={() => onUpdate(widget)} />;

		case "recent":
			return <RecentWidget onSubmit={() => onUpdate(widget)} />;

		case "ads":
			return (
				<AdsWidget
					onSubmit={() => onUpdate(widget)}
					onDelete={
						widget.deletable === "1"
							? () => onDelete(widget)
							: undefined
					}
				/>
			);

		case "category":
			return (
				<CategoryWidget
					onSubmit={() => onUpdate(widget)}
					onDelete={() => onDelete(widget)}
				/>
			);

		case "social_media":
			return <SocialMediaWidget onSubmit={() => onUpdate(widget)} />;

		case "search":
			return <SearchWidget onSubmit={() => onUpdate(widget)} />;

		case "schedule":
			return <SchedulerWidget onSubmit={() => onUpdate(widget)} />;

		case "selected_shows":
			return (
				<PickedShowsWidget
					onSubmit={() => onUpdate(widget)}
					onDelete={() => onDelete(widget)}
				/>
			);

		case "about":
			return <AboutWidget onSubmit={() => onUpdate(widget)} />;

		case "links_list":
			return (
				<LinksListWidget
					links={widget.settings.links}
					onSubmit={() => onUpdate(widget)}
				/>
			);

		case "account":
			return <AccountWidget onSubmit={() => onUpdate(widget)} />;

		default:
			return null;
	}
};

export default WidgetsWrapper;
