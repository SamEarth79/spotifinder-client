import React from "react";
import {
    HomeIcon,
    QrCodeIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const urlString = window.location.href;
    const parsedUrl = new URL(urlString);
    const currentPage = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;



    return (
        <div className="fixed bottom-0 w-full max-w-sm bg-gray-600 rounded-tl-3xl rounded-tr-3xl flex justify-around items-center p-3">
            <div className="flex flex-col items-center justify-center" onClick={()=>{navigate("/user")}}>
                <HomeIcon className={`h-6 aspect-square ${currentPage==="/user" ? 'text-green-500' : 'text-black'}`} />
            </div>
            <div className="" onClick={()=>{navigate("/scanner")}}>
                <QrCodeIcon className="w-12 aspect-square text-black bg-green-500 p-[4px] rounded-full" />
            </div>
            <div className="" onClick={()=>{navigate("/settings")}}>
                <Cog6ToothIcon className={`h-6 aspect-square ${currentPage==="/settings" ? 'text-green-500' : 'text-black'}`} />
            </div>
        </div>
    );
};

export default Footer;
