import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";

const ContactDialog = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="">
                <EnvelopeIcon className="w-6" />
                <p>reply.matchingbeats@gmail.com</p>
            </div>
            <h1 className="font-bold mb-10">Open to business</h1>
        </div>
    );
};

export default ContactDialog;
