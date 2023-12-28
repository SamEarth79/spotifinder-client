import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import AppContainer from "../components/AppContainer/AppContainer";
import { ReactComponent as SpotifinderTreble } from "../images/spotifinder_treble.svg";

const Home = () => {
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem("userData"))
        ? JSON.parse(localStorage.getItem("userData")).profileData
        : location.state.profileData;
    const navigate = useNavigate();

    const copyToClipboard = (textToCopy) => {
        try {
            navigator.clipboard.writeText(textToCopy);
        } catch (err) {
            console.error("Unable to copy to clipboard", err);
        }
    };

    const gsapAnimations = () => {
        let tl = gsap.timeline({});

        tl.fromTo(
            "#qr_backdrop",
            {
                height: 0,
            },
            {
                height: 400,
                duration: 2,
            }
        );

        tl.fromTo(
            ".qr_code",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.5,
            },
            "<70%"
        );

        tl.fromTo(
            ".logo__container",
            {
                autoAlpha: 0,
                x: 40,
                y: -40,
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
            }
        );

        tl.fromTo(
            ".userButton",
            {
                autoAlpha: 0,
                x: 40,
                y: -40,
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
            },
            "<"
        );
        tl.fromTo(
            ".name__container",
            {
                autoAlpha: 0,
                x: -40,
                y: -10,
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
            },
            "<"
        );
        tl.fromTo(
            ".code__container",
            {
                autoAlpha: 0,
                x: 0,
                y: 40,
            },
            {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
            },
            "<"
        );
        tl.fromTo(
            ".info",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.5,
            },
            "<"
        );
    };

    useEffect(() => {
        gsapAnimations();
    }, []);

    return (
        <AppContainer className={`px-8 pt-8`}>
            <div className="userButton__container flex justify-between w-full items-center pb-8">
                <div className="logo__container hero-text text-green-500 font-Cabin font-semibold tracking-tighter text-4xl w-fit">
                    matchingbeats
                </div>
                <div className="userButton relative flex flex-col items-center gap-1" onClick={()=>{navigate("/settings")}}>
                    <div
                        className={`bg-green-500 w-16 aspect-square rounded-full border border-white`}
                    >
                        <img
                            src={`${userData.image}`}
                            alt="user logo"
                            className="overflow-hidden rounded-full object-contain"
                        />
                    </div>
                    <div className="absolute -bottom-16 flex items-center gap-1">
                        <h2 className="text-white">{userData.tokens}</h2>
                        <SpotifinderTreble className="w-2" />
                    </div>
                </div>
            </div>
            <div className="name__container flex flex-col w-full">
                <h1 className="text-3xl font-Cabin capitalize  text-secondary-gray tracking-tight">
                    Hi,
                </h1>
                <h1 className="text-3xl font-Cabin capitalize font-semibold text-white tracking-tight">
                    {userData.name}
                </h1>
            </div>
            <div className="share__container flex flex-col items-center pb-20">
                <div className="qr__container py-10 relative flex flex-col items-center justify-center">
                    <p className="info text-xs font-light tracking-tight text-center text-gray-300">
                        Tap the green circle to scan your friend's QR
                    </p>
                    <div
                        className="flex justify-center items-center w-fit p-11 overflow-hidden bg-inherit rounded-full aspect-square mt-4 shadow-2xl relative"
                        onClick={() =>
                            navigate("/scanner", { state: userData.uid })
                        }
                    >
                        <div
                            id="qr_backdrop"
                            className="bg-green-500 z-40 w-full absolute bottom-0"
                        ></div>
                        <QRCode
                            size={160}
                            // value="Koala loves you a lot and misses you and wished to see Rey soon<3"
                            value={userData.uid}
                            viewBox={`0 0 256 256`}
                            bgColor="#22c55e"
                            fgColor="#000000"
                            className="z-50 qr_code"
                        />
                    </div>
                    <div className="z-50 flex items-center gap-[0.1rem] bg-white rounded-full p-1 leading-[0px] aspect-square absolute bottom-10 right-10">
                        <p className="text-sm">{userData.cost_of_match}</p>
                        <SpotifinderTreble className="w-2 h-fit" />
                    </div>
                </div>
                <div className="code__container flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-light tracking-tight text-center text-gray-300">
                            Or share this code to your friend
                        </p>
                        <h1 className="bg-inherit border p-2 rounded-md text-center text-xl text-white font-Cabin relative">
                            <span>{userData.uid}</span>
                            <button
                                className="absolute right-2 bottom-1/2 translate-y-1/2 active:bg-slate-200 active:rounded-full active:p-1 p-1 transition-all duration-100"
                                onClick={copyToClipboard(userData.uid)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-slate-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                    />
                                </svg>
                            </button>
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-light tracking-tight text-center text-gray-300">
                            {/* Or paste your friend's code here */}
                        </p>
                        <div className="bg-inherit border p-2 rounded-md ">
                            <input
                                className="text-center text-xl text-white font-Cabin bg-inherit border-b-2 border-secondary-gray focus:outline-none placeholder:text-xs placeholder:font-light placeholder:tracking-tight placeholder:text-center placeholder:text-white"
                                type="text"
                                placeholder="Or paste your friend's code here"
                                name=""
                                id=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default Home;
