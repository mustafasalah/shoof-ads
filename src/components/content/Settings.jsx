import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import SectionHeader from "./../common/SectionHeader";
import FormSection from "./../common/form/FormSection";
import FormSideSection from "./../common/form/FormSideSection";
import FormField from "./../common/form/FormField";
import LogoField from "./LogoField";
import SiteBackgroundField from "./SiteBackgroundField";
import FaviconField from "./FaviconField";
import SettingsActions from "../../actions/SettingsActions";
import { upperFirst } from "../../js/Utility";
import { getAvailableLangs } from "../services/settingsServices";

const supported_social_media = [
    "facebook",
    "twitter",
    "instagram",
    "youtube",
    "pinterest",
    "linkedin",
    "reddit",
    "tiktok",
    "dribbble",
    "flickr",
    "twitch",
    "soundcloud",
    "vk",
    "telegram",
    "snapchat",
    "patreon",
];

const SaveButton = () => (
    <section className="widget save-btn">
        <button className="primary-btn focus-shadow radius">
            <i className="fas fa-save" style={{ marginRight: 3 }}></i> Save
            Changes
        </button>
    </section>
);

const Settings = ({
    data,
    onFormSubmit: onSubmit,
    onSettingsDataLoad: loadSettingsData,
}) => {
    const [langs, setLangs] = useState([]);

    // Get available languages list
    useEffect(() => {
        (async () => {
            const availableLangs = await getAvailableLangs();
            setLangs(availableLangs);
        })();
    }, []);

    return (
        <Fragment>
            <SectionHeader name="General Settings" faClass="fas fa-cogs" />
            <form
                method="POST"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(data, loadSettingsData);
                }}
            >
                <div id="main-side">
                    <FormSection header="Website Meta Information">
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.site_name"
                                    label="Site Name"
                                    type="text"
                                    placeholder="e.g. MEVid"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.home_page_title"
                                    label="Home Page Title"
                                    type="text"
                                    placeholder="[site-name] - [page title will appear here...]"
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.keywords"
                                    label="Keywords"
                                    type="text"
                                    placeholder="e.g. Movies, TV Shows, Anime, online watching..."
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.description"
                                    label="Site Description"
                                    type="textarea"
                                    placeholder="eg. MEVid for watching and downloading Movies, anime and TV Show as you want, With different resolution and Quality!"
                                    required
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection header="General Options" faClass="fas fa-cog">
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.default_language"
                                    label="Site Language"
                                    type="select"
                                    placeholder="Select Site Language"
                                    options={langs}
                                    required
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.dark_mode"
                                    label="Default Theme"
                                    type="select"
                                    placeholder="Select Default Theme"
                                    options={[
                                        {
                                            label: "Light Theme",
                                            value: 0,
                                        },
                                        {
                                            label: "Dark Theme",
                                            value: 1,
                                        },
                                    ]}
                                    required
                                />
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.comments_enabled"
                                        label="Comments"
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.comments_supervisor"
                                        label="Supervise Comments"
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.reviews_enabled"
                                        label="Reviews"
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.reviews_supervisor"
                                        label="Supervise Reviews"
                                        type="radio"
                                    />
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="field">
                                    <FormField
                                        name="settings.registeration_enabled"
                                        label="User Registeration"
                                        type="radio"
                                    />
                                </div>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header="External Api Configuration"
                        faClass="fas fa-cog"
                    >
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.fb_app_id"
                                    label="Facebook App ID"
                                    type="text"
                                    placeholder="Get it from: https://developers.facebook.com/apps"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.fb_app_secret"
                                    label="Facebook App Secret"
                                    type="text"
                                    placeholder="Get it from: https://developers.facebook.com/apps"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.tw_app_id"
                                    label="Twitter App ID"
                                    type="text"
                                    placeholder="Get it from: https://apps.twitter.com/app/new"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.tw_app_secret"
                                    label="Twitter App Secret"
                                    type="text"
                                    placeholder="Get it from: https://apps.twitter.com/app/new"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <FormField
                                    name="settings.captcha_site_key"
                                    label="Captcha Site Key"
                                    type="text"
                                    placeholder="https://www.google.com/recaptcha/admin/create"
                                />
                            </div>
                            <div className="col-2">
                                <FormField
                                    name="settings.captcha_secret_key"
                                    label="Captcha Secret Key"
                                    type="text"
                                    placeholder="https://www.google.com/recaptcha/admin/create"
                                />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        header="Social Media Accounts"
                        faClass="fas fa-share-alt"
                        closed
                    >
                        <div className="row">
                            {supported_social_media.map((social_media) => (
                                <div className="col-2">
                                    <div className="row">
                                        <div className="col-4-3">
                                            <FormField
                                                name={`settings.${social_media}.url`}
                                                label={`${upperFirst(
                                                    social_media
                                                )} Account`}
                                                type="url"
                                                placeholder={`e.g. https://www.${social_media}.com/mevid`}
                                            />
                                        </div>
                                        <div className="col-4-1">
                                            <FormField
                                                name={`settings.${social_media}.counter`}
                                                label="Fans"
                                                type="text"
                                                placeholder="e.g. 20K"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FormSection>
                </div>

                <div id="end-side">
                    <SaveButton />

                    <FormSideSection label="Site Logo" id="site-logo" required>
                        <LogoField />
                    </FormSideSection>

                    <FormSideSection label="Site Background" id="site-bg">
                        <SiteBackgroundField />
                    </FormSideSection>

                    <FormSideSection label="Site Favicon" id="site-favicon">
                        <FaviconField />
                    </FormSideSection>

                    <SaveButton />
                </div>
            </form>
        </Fragment>
    );
};

export default connect(
    (state) => ({ data: state.forms.settings.data }),
    SettingsActions
)(Settings);
