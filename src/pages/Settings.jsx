import React, { useEffect, useState } from "react";
import {
    ChevronRightIcon,
    ChevronDownIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";
import AppContainer from "../components/AppContainer/AppContainer";
import { ReactComponent as SpotifinderTreble } from "../images/spotifinder_treble.svg";
import {load} from '@cashfreepayments/cashfree-js';
import Backend from "../components/api/Backend";
import Loader from "../components/Loader/Loader";

function CollapsibleSection({ title, children }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="collapsible-section">
            <div
                className="collapsible-header flex gap-2 items-center"
                onClick={toggleCollapse}
            >
                <span>
                    {isCollapsed ? (
                        <ChevronRightIcon className="w-4 aspect-square font-bold text-white" />
                    ) : (
                        <ChevronDownIcon className="w-4 aspect-square font-bold text-white" />
                    )}
                </span>
                <h2 className="text-green-500 text-xl uppercase font-bold py-6">
                    {title}
                </h2>
            </div>
            {!isCollapsed && (
                <div className="collapsible-content text-white pl-4">
                    {children}
                </div>
            )}
        </div>
    );
}

const cashfree = await load({
	mode: "sandbox" //or production
});



const initiatePayment = async(type, uid) => {

    let data = {
        'type': type,
        'uid': uid
    }
    const response = await Backend.post("/create_cashfree_order/", data)

    if(response.data["status"]!==1200){
        alert("Error in creating order data");
        return;
    }

    let order_data = response.data["payload"];

    let checkoutOptions = {
        paymentSessionId: order_data["payment_session_id"],
        returnUrl: `http://${window.location.host}/settings?order_id={order_id}`,
    }

    cashfree.checkout(checkoutOptions).then(function(result){
        if(result.error){
            alert(result.error.message)
        }
        if(result.redirect){
            console.log("Redirection")
        }
    });
}



const BuyOption = ({ index, uid, tokens, price }) => {
    return (
        <div className="bg-white flex-col rounded-lg" onClick={()=>initiatePayment(index, uid)}>
            <div className="flex justify-center items-center gap-1 px-5">
                <h1 className="text-lg">{tokens}</h1>
                <SpotifinderTreble className="w-3" />
            </div>
            <div className="flex justify-center items-center w-full p-1 bg-green-500 rounded-br-lg rounded-bl-lg">
                <h1 className="text-lg">₹{price}</h1>
            </div>
        </div>
    );
};

const Settings = () => {

    // let userData = JSON.parse(localStorage.getItem("userData"))?.profileData;
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData"))?.profileData)
    const [loading, setLoading] = useState(true)

    

    useEffect(()=>{
        const getUserProfile = async(order_id) => {
            console.log("Getting user data from Mongo");
            let data = {
                "uid": userData['uid'],
                "order_id": order_id,
            }
            console.log(data);
            const response = await Backend.post(`/get_updated_user_data/`, data);
            console.log(response);
            if(response.status===200){
                localStorage.setItem("userData", JSON.stringify(response.data));
            }
            setUserData(JSON.parse(localStorage.getItem("userData"))?.profileData)
            setLoading(false)
        }
        
        const searchParams = new URLSearchParams(document.location.search)
        let order_id = searchParams.get('order_id')

        getUserProfile(order_id);
    },[])


    if(loading===true)
    return (<Loader />)
    return (
        <AppContainer className={`items-start px-6 py-2`}>
            <div className="profile py-10 w-full">
                <div className="image_name flex items-center gap-2 p-2">
                    <img
                        src={`${userData?.image}`}
                        className="aspect-square w-16 rounded-full"
                        alt=""
                    />
                    <h1 className="text-center text-white text-xl font-semibold">
                        {userData?.name}
                    </h1>
                </div>
                <div className="trebles w-full p-2 flex flex-col justify-center ">
                    <div className="flex items-center justify-center gap-6 w-full">
                        <p className="info text-sm font-thin tracking-tight text-gray-300">
                            Tokens left
                        </p>
                        <div
                            className="flex items-center justify-center gap-1 border-2 shadow-2xl drop-shadow-2xl border-green-500 bg-white max-w-fit my-4 px-5 aspect-square rounded-full
                        "
                        >
                            <h1 className="text-4xl">{userData?.tokens}</h1>
                            <SpotifinderTreble className="w-4" />
                        </div>
                    </div>
                    <div className="flex items-center p-2 justify-around w-full">
                        <BuyOption index={0} uid={userData['uid']} tokens="+20" price="50" />
                        <BuyOption index={1} uid={userData['uid']} tokens="+50" price="75" />
                        <BuyOption index={2} uid={userData['uid']} tokens="+100" price="100" />
                    </div>
                </div>
            </div>
            <div className="w-full pb-10 overflow-scroll flex flex-col items-start">
                <CollapsibleSection title="Privacy Policy">
                    {
                        <div className="max-h-screen overflow-scroll flex flex-col gap-4">
                            <p>
                                Welcome to matchingbeats. Your privacy is
                                important to us, and we are committed to
                                protecting your personal information. This
                                Privacy Policy explains how we collect, use,
                                disclose, and safeguard your data when you use
                                our services.
                            </p>
                            <div className="">
                                <h2 className="text-xl font-semibold text-gray-300">
                                    Information We Collect
                                </h2>

                                <ol>
                                    <li>
                                        <strong>
                                            User-Provided Information:
                                        </strong>{" "}
                                        To use matchingbeats, you may need to
                                        authorize us to access your Spotify
                                        data, including but not limited to
                                        playlists, music preferences, and user
                                        information. We do not store your
                                        Spotify credentials.
                                    </li>
                                    <li>
                                        <strong>
                                            Automatically Collected Information:
                                        </strong>{" "}
                                        We may collect certain information
                                        automatically when you use our services,
                                        including your IP address, device
                                        information, browser type, and usage
                                        data. This information helps us improve
                                        our services and user experience.
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
                                        Spotify data to match you with other
                                        users based on music preferences. Your
                                        data is anonymized and used solely for
                                        this purpose.
                                    </li>
                                    <li>
                                        <strong>Improving Services:</strong> We
                                        analyze usage data to enhance our
                                        website's functionality, content, and
                                        features.
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
                                    However, no method of transmission or
                                    storage on the internet is completely
                                    secure. While we strive to protect your
                                    data, we cannot guarantee its absolute
                                    security.
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
                                        <strong>With Your Consent:</strong> We
                                        may share your data with your explicit
                                        consent or at your direction.
                                    </li>
                                    <li>
                                        <strong>Legal Requirements:</strong> We
                                        may disclose your data if required to do
                                        so by law or in response to valid legal
                                        requests.
                                    </li>
                                </ol>
                            </div>
                            <div className="">
                                <h2>Your Choices</h2>

                                <p>
                                    You have the following rights regarding your
                                    data:
                                </p>

                                <ol>
                                    <li>
                                        <strong>Access and Correction:</strong>{" "}
                                        You can access and correct your data
                                        through your matchingbeats account
                                        settings.
                                    </li>
                                    <li>
                                        <strong>Deletion:</strong> You can
                                        request the deletion of your account and
                                        data by contacting us.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    }
                </CollapsibleSection>
                <CollapsibleSection title="About matchingbeats">
                    {
                        <p>
                            matchingbeats is a fun side project that I have
                            developed for my passion of building such amusing
                            websites.
                            <br />
                            <br /> However, this is my first big project where I
                            have introduced monetisation to earn some coffee
                            money because I put in many hours for these after my
                            9-6 work. <br />
                            <br />
                            The website still has a lot of potential to grow and
                            to be more amusing. I'm happy for all your feedbacks
                            that you can send on reply.matchingbeats@gmail.com
                        </p>
                    }
                </CollapsibleSection>
                <CollapsibleSection title="Contact">
                    {
                        <div className="flex flex-col gap-4">
                            <div className="">
                                <EnvelopeIcon className="w-6" />
                                <p>reply.matchingbeats@gmail.com</p>
                            </div>
                            <h1 className="font-bold mb-10">Open to business</h1>
                        </div>
                    }
                </CollapsibleSection>
            </div>
        </AppContainer>
    );
};

export default Settings;
