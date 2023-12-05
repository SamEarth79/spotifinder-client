import React, { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { DESKTOP_TAILWIND } from "../constants/constants";
import "../styles/scanner.css";
import Backend from "../components/api/Backend";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import AppContainer from "../components/AppContainer/AppContainer";

const Scanner = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 550,
                height: 550,
            },
            fps: 5,
            rememberLastUsedCamera: true,
            showTorchButtonIfSupported: true,
            showZoomSliderIfSupported: true,
            formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        });
        // document.getElementById("html5-qrcode-button-camera-permission").innerHTML="Scan"

        const success = async (result) => {
            const requestData = {
                uid1: JSON.parse(localStorage.getItem("userData"))
                    ? JSON.parse(localStorage.getItem("userData")).profileData
                          .uid
                    : location.state,
                uid2: result,
            };
            const response = await Backend.post("/match/", requestData);
            console.log(response.data.payload.match);
            const payload = response.data.payload;
            scanner.clear();
            navigate("/match", { state: payload });
        };

        const error = (err) => {};
        scanner.render(success, error);
    }, []);

    return (
        <AppContainer className={``}>
            <div className="h-screen flex flex-col items-center justify-center gap-10">
                <div
                    className="w-full text-white font-Cabin flex flex-col justify-center items-center"
                    id="reader"
                ></div>
                <div className="logo__container absolute bottom-20 hero-text text-green-500 font-Cabin font-semibold tracking-tighter text-4xl w-fit">
                    <p>Spotifinder</p>
                </div>
            </div>
        </AppContainer>
    );
};

export default Scanner;
