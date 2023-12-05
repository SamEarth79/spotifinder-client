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
                    Spotifinder
                </div>
                <div className="userButton relative flex flex-col items-center gap-1">
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
                    <p className="info text-sm font-thin tracking-tight text-gray-300">
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
                        <h1 className="bg-inherit border p-2 rounded-md text-center text-xl text-white font-Cabin">
                            {userData.uid}
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
