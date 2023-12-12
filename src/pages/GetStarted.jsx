import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Backend from "../components/api/Backend";
import { gsap } from "gsap";
import SplitType from "split-type";
import "../styles/get-started.css";
import AppContainer from "../components/AppContainer/AppContainer";
import { BounceLoader } from "react-spinners";

const GetStarted = () => {
    const navigate = useNavigate();
    localStorage.clear();

    const logoText = "Spotifinder";
    const loadingText = "Let's get you in..";
    const [mainText, setMainText] = useState(logoText);

    const checkAccessToken = async () => {
        const fragmentString = window.location.hash.substring(1); // Get the fragment identifier without the '#'
        const params = new URLSearchParams(fragmentString); // Parse the parameters
        const accessToken = params.get("access_token"); // Retrieve the access_token parameter
        if (accessToken != null) {
            setMainText(loadingText);
            const data = {
                accessToken: accessToken,
            };
            let response = await Backend.post("/handle_access_token/", data);
            console.log(response.data.status);
            if (response.data.status === 200) {
                localStorage.setItem("userData", JSON.stringify(response.data));
                navigate("/user", { state: response.data });
            }
        }
    };

    const performImplicitGrant = async () => {
        const response = await Backend.get("/get_implicit_grant_url/");
        // TODO: Handle exception/error
        const data = response.data;
        window.location = data.url;
    };

    useEffect(() => {
        checkAccessToken();
        let tl = gsap.timeline();
        const myText = new SplitType("#my-text");
        gsap.to(".char", {
            y: 0,
            stagger: 0.05,
            delay: 0.2,
            duration: 0.1,
        });
        gsap.fromTo(
            ".get-started",
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.5,
                delay: 1.5,
            }
        );
    }, []);

    return (
        <AppContainer footer={false}>
            <div className="h-screen flex flex-col items-center justify-center gap-10">
                <div>
                    <header className="grid place-content-center">
                        <h1
                            className="hero-text text-green-500 font-Cabin font-semibold tracking-tighter text-6xl w-fit"
                            id="my-text"
                        >
                            {mainText}
                        </h1>
                    </header>
                </div>
                {mainText === logoText ? (
                    <div className="get-started bg-inherit w-fit p-[7px] rounded-lg border border-white">
                        <div
                            className="font-semibold font-Cabin tracking-tight bg-green-500 w-fit px-6 py-2 rounded-lg cursor-pointer"
                            onClick={performImplicitGrant}
                        >
                            Get started
                        </div>
                    </div>
                ) : (
                    <BounceLoader color="#22c55e" true />
                )}
            </div>
        </AppContainer>
    );
};

export default GetStarted;
