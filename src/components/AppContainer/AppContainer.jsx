import React from "react";
import { DESKTOP_TAILWIND } from "../../constants/constants";
import Footer from "../Footer/Footer";

const AppContainer = ({ children, footer=true, className }) => {
    return (
        <div
            className="App min-h-screen max-h-max w-screen flex flex-col items-center bg-gradient-to-t from-bg-black-bottom to-bg-black-top
        "
        >
            <div
                className={
                    `flex flex-col w-full h-max items-center justify-start max-w-sm mx-auto lg:border lg:rounded-3xl lg:shadow-black lg:shadow-2xl ${className}`
                }
            >
                {children}
            </div>
            {footer ? <Footer /> : <></>}
        </div>
    );
};

export default AppContainer;
