import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Backend from "../components/api/Backend";
import { gsap } from "gsap";
import SplitType from "split-type";
import "../styles/get-started.css";
import AppContainer from "../components/AppContainer/AppContainer";
import { BounceLoader } from "react-spinners";
import Dialog from "../components/Dialog/Dialog";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const GetStarted = () => {
    const navigate = useNavigate();
    localStorage.clear();

    const logoText = "Spotifinder";
    const loadingText = "Let's get you in..";
    const [mainText, setMainText] = useState(logoText);
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [howItWorks, setHowItWorks] = useState(false);

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
        gsap.fromTo(
            ".footer-links",
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
        <AppContainer footer={false} className="relative">
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
                <div className="footer-links flex flex-col gap-4 text-lg justify-center items-center text-green-500 absolute bottom-10">
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <p onClick={() => {
                                setPrivacyPolicyOpen(true);
                            }}>Privacy Policy</p>
                        <span> | </span>
                        <p
                            onClick={() => {
                                setContactOpen(true);
                            }}
                        >
                            Contact
                        </p>
                    </div>
                    <p>How spotifinder works</p>
                </div>
            </div>
            <Dialog
                isOpen={contactOpen}
                setIsOpen={setContactOpen}
                title={"Contact"}
                content={
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <EnvelopeIcon className="w-6" />
                            <p>reply.spotifinder@gmail.com</p>
                        </div>
                        <h1 className="font-bold mb-10">Open to business</h1>
                    </div>
                }
            />
            <Dialog
                isOpen={privacyPolicyOpen}
                setIsOpen={setPrivacyPolicyOpen}
                title={"Privacy Policy"}
                content={
                    <div className="max-h-screen overflow-scroll flex flex-col gap-4">
                        <p>
                            Welcome to Spotifinder. Your privacy is important to
                            us, and we are committed to protecting your personal
                            information. This Privacy Policy explains how we
                            collect, use, disclose, and safeguard your data when
                            you use our services.
                        </p>
                        <div className="">
                            <h2 className="text-xl font-semibold text-gray-300">
                                Information We Collect
                            </h2>

                            <ol>
                                <li>
                                    <strong>User-Provided Information:</strong>{" "}
                                    To use Spotifinder, you may need to
                                    authorize us to access your Spotify data,
                                    including but not limited to playlists,
                                    music preferences, and user information. We
                                    do not store your Spotify credentials.
                                </li>
                                <li>
                                    <strong>
                                        Automatically Collected Information:
                                    </strong>{" "}
                                    We may collect certain information
                                    automatically when you use our services,
                                    including your IP address, device
                                    information, browser type, and usage data.
                                    This information helps us improve our
                                    services and user experience.
                                </li>
                            </ol>
                        </div>
                        <div className="">
                            <h2 className="text-xl font-semibold text-gray-300">
                                How We Use Your Information
                            </h2>

                            <p>
                                We use the collected information for the
                                following purposes:
                            </p>

                            <ol>
                                <li>
                                    <strong>Matching:</strong> We use your
                                    Spotify data to match you with other users
                                    based on music preferences. Your data is
                                    anonymized and used solely for this purpose.
                                </li>
                                <li>
                                    <strong>Improving Services:</strong> We
                                    analyze usage data to enhance our website's
                                    functionality, content, and features.
                                </li>
                            </ol>
                        </div>
                        <div className="">
                            <h2 className="text-xl font-semibold text-gray-300">
                                Data Security
                            </h2>

                            <p>
                                We take data security seriously and employ
                                reasonable measures to protect your data.
                                However, no method of transmission or storage on
                                the internet is completely secure. While we
                                strive to protect your data, we cannot guarantee
                                its absolute security.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-300">
                                Disclosure of Your Information
                            </h2>

                            <p>
                                We may share your data in the following
                                circumstances:
                            </p>

                            <ol>
                                <li>
                                    <strong>With Your Consent:</strong> We may
                                    share your data with your explicit consent
                                    or at your direction.
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> We may
                                    disclose your data if required to do so by
                                    law or in response to valid legal requests.
                                </li>
                            </ol>
                        </div>
                        <div className="mb-20">
                            <h2>Your Choices</h2>

                            <p>
                                You have the following rights regarding your
                                data:
                            </p>

                            <ol>
                                <li>
                                    <strong>Access and Correction:</strong> You
                                    can access and correct your data through
                                    your Spotifinder account settings.
                                </li>
                                <li>
                                    <strong>Deletion:</strong> You can request
                                    the deletion of your account and data by
                                    contacting us.
                                </li>
                            </ol>
                        </div>
                    </div>
                }
            />
            <Dialog
                isOpen={howItWorks}
                setIsOpen={setHowItWorks}
                title={""}
                content={
                    <div>
                </div>
                }
            />
        </AppContainer>
    );
};

export default GetStarted;
