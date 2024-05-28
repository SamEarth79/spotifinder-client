import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { DESKTOP_TAILWIND } from "../constants/constants";
import "../styles/match.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Match = () => {
    const location = useLocation();
    const profile1 = location.state.profile1;
    const profile2 = location.state.profile2;
    const commonArtists = location.state.common_artists.slice(0, 5);
    const features = location.state.features;
    const [loadingMatch, setLoadingMatch] = useState(0);
    let matchStatus = "Ehh?";
    if (location.state.match > 25) matchStatus = "Buddies";
    if (location.state.match > 50) matchStatus = "Besties";
    if (location.state.match > 65) matchStatus = "Homies";
    if (location.state.match > 80) matchStatus = "Soulmates";
    let stats = useRef(null);


    const gsapAnimations = () => {
        let tl = gsap.timeline({});
        // tl.fromTo(
        //     ".circle__container",
        //     {
        //         autoAlpha: 0,
        //     },
        //     {
        //         autoAlpha: 1,
        //         duration: 0.3,
        //     }
        // );
        // tl.fromTo(
        //     ".circle__container",
        //     {
        //         gap: 0,
        //     },
        //     {
        //         gap: "40%",
        //         duration: 0.6,
        //         ease: "expo",
        //     }
        // );
        tl.fromTo(
            ".match_c",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.6,
                ease: "expo",
            }
        );
        tl.to(
            ".circle__container",
            {
                gap: 0,
                duration: 0.6,
                ease: "expo",
                delay: (40 * location.state.match) / 1000,
            },
            ">"
        );
        tl.fromTo(
            ".message_container",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.6,
                ease: "expo",
            },
            ">"
        );
        tl.fromTo(
            ".common__artists__container",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.6,
                ease: "expo",
            },
            ">"
        );
        tl.fromTo(
            ".stat__container",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.6,
                ease: "expo",
            },
            ">"
        );
    };

    const setFeatureWidths = () => {
        console.log("Setting features");
        features.forEach((feature) => {
            let feature1_metric = Math.round(
                profile1["feature_data"][feature] * 100
            );
            let feature2_metric = Math.round(
                profile2["feature_data"][feature] * 100
            );
            let feature1 = document.getElementById(`${feature}1`);
            let feature2 = document.getElementById(`${feature}2`);
            feature1.style.width = `${feature1_metric}px`;
            feature2.style.width = `${feature2_metric}px`;
        });
    };

    useEffect(() => {
        setFeatureWidths();
        gsapAnimations();
        setInterval(() => {
            setLoadingMatch((prevState) => {
                return prevState + 1 <= location.state.match
                    ? prevState + 1
                    : location.state.match;
            });
        }, 40);
    }, []);

    return (
        <div className="w-screen flex items-center justify-center bg-gradient-to-t from-bg-black-bottom to-bg-black-top">
            <div
                className={
                    "flex flex-col w-full py-8 px-6 items-center gap-10 " +
                    DESKTOP_TAILWIND
                }
            >
                <div className="userButton__container w-full flex justify-between items-center pb-8 mt-4">
                    <div className="logo__container hero-text text-left text-green-500 font-Cabin font-semibold tracking-tighter text-4xl w-fit">
                        matchingbeats
                    </div>
                    <div
                        className={`userButton bg-green-500 w-16 aspect-square`}
                    >
                        <img
                            src={`${profile1.image}`}
                            alt="user logo"
                            className="overflow-hidden object-contain cursor-pointer"
                            onClick={() => {window.open(`${profile1.user_url}`, '_blank')}}
                        />
                    </div>
                </div>
                <div className="circle__container flex w-full justify-around items-center relative">
                    <div
                        className={`w-[100px] aspect-square relative flex overflow-hidden`}
                    >
                        <img
                            src={profile1.image}
                            className="w-full object-cover cursor-pointer"
                            alt="profil pic of user 1"
                            onClick={() => {window.open(`${profile1.user_url}`, '_blank')}}
                        />
                    </div>
                    <div className="match__container  text-white text-6xl font-semibold">
                        <p className="match_c">{loadingMatch}</p>
                    </div>
                    <div
                        className={`w-[100px] aspect-square relative flex overflow-hidden`}
                    >
                        <img
                            src={profile2.image}
                            className="w-full object-cover"
                            alt="profile pic of user 2"
                            onClick={() => {window.open(`${profile2.user_url}`, '_blank')}}
                        />
                    </div>
                </div>
                <div className="message_container flex flex-col items-center gap-2">
                    <p className="text-sm font-thin tracking-tight text-gray-300 italic">
                        You guys are,
                    </p>
                    <h1 className="text-white text-4xl">{matchStatus}</h1>
                </div>
                <div className="common__artists__container">
                    <p className="text-sm font-thin tracking-tight text-gray-300 italic">
                        You both love,
                    </p>
                    <div className="flex justify-center gap-x-10 gap-y-4 flex-wrap mt-4">
                        {Object.values(commonArtists).map(
                            (commonArtist, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center gap-y-1 flex-wrap cursor-pointer"
                                        onClick={() => {window.open(`${commonArtist["artist_external_url"]}`, '_blank')}}
                                    >
                                        <img
                                            src={
                                                commonArtist["artist_image_url"]
                                            }
                                            className="w-14 aspect-square"
                                            alt=""
                                        />
                                        <p className="text-white text-xs">
                                            {commonArtist["artist_name"]}
                                        </p>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                <div className="stat__container flex flex-col w-full">
                    <div className="stat__pic__container flex justify-between items-center w-full">
                        <img
                            src={profile1.image}
                            className="w-14 aspect-square cursor-pointer"
                            alt="profile pic of user 1"
                            onClick={() => {window.open(`${profile1.user_url}`, '_blank')}}
                        />
                        <p className="text-sm font-thin tracking-tight text-gray-300 italic">
                            Let's deep dive
                        </p>
                        <img
                            src={profile2.image}
                            className="w-14 aspect-square cursor-pointer"
                            alt="profile pic of user 2"
                            onClick={() => {window.open(`${profile2.user_url}`, '_blank')}}
                        />
                    </div>
                    <div className="flex flex-col gap-4 stats" ref={(el) => (stats = el)}>
                        {Object.values(features).map((feature, index) => {
                            let feature1_metric = Math.round(
                                profile1["feature_data"][feature] * 100
                            );
                            let feature2_metric = Math.round(
                                profile2["feature_data"][feature] * 100
                            );
                            // console.log(feature);
                            // console.log(`${feature1_metric}px`);
                            return (
                                <div key={index} className="flex justify-between items-end text-white font-extralight text-xs">
                                    <p>{feature1_metric}%</p>
                                    <div
                                        className="flex flex-col items-center mt-6 gap-3"
                                    >
                                        <p className="text-base font-medium capitalize tracking-tight text-gray-300">
                                            {feature}
                                        </p>
                                        <div className="flex relative justify-center items-center gap-2 text-white">
                                            <div
                                                className={`absolute stat_p1 right-1 h-1 bg-green-500 rounded-md opacity-100`}
                                                id={`${feature}1`}
                                            ></div>
                                            <div
                                                className={`absolute stat_p2 left-1 h-1 bg-green-500 rounded-md opacity-100`}
                                                id={`${feature}2`}
                                            ></div>
                                        </div>
                                    </div>
                                    <p>{feature2_metric}%</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="ad__section">
                    <h1 className="text-white">Liked matchingbeats? Please share it to your friends</h1>
                </div>
            </div>
        </div>
    );
};

export default Match;
