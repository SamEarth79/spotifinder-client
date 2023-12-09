import React from "react";
import AppContainer from "../AppContainer/AppContainer";
import { BounceLoader } from "react-spinners";

const Loader = () => {
    return (
        <AppContainer className={`items-start px-6 py-2`}>
            <div className="w-full h-screen flex justify-center items-center">
                <BounceLoader color="#22c55e" true />
            </div>
        </AppContainer>
    );
};

export default Loader;
