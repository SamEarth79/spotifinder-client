import React from "react";

const PrivacyPolicyDialog = () => {
    return (
        <div className="max-h-screen overflow-scroll flex flex-col gap-4">
            <p>
                Welcome to matchingbeats. Your privacy is important to us, and we
                are committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your data when you use our services.
            </p>
            <div className="">
                <h2 className="text-xl font-semibold text-gray-300">
                    Information We Collect
                </h2>

                <ol>
                    <li>
                        <strong>User-Provided Information:</strong> To use
                        matchingbeats, you may need to authorize us to access your
                        Spotify data, including but not limited to playlists,
                        music preferences, and user information. We do not store
                        your Spotify credentials.
                    </li>
                    <li>
                        <strong>Automatically Collected Information:</strong> We
                        may collect certain information automatically when you
                        use our services, including your IP address, device
                        information, browser type, and usage data. This
                        information helps us improve our services and user
                        experience.
                    </li>
                </ol>
            </div>
            <div className="">
                <h2 className="text-xl font-semibold text-gray-300">
                    How We Use Your Information
                </h2>

                <p>
                    We use the collected information for the following purposes:
                </p>

                <ol>
                    <li>
                        <strong>Matching:</strong> We use your Spotify data to
                        match you with other users based on music preferences.
                        Your data is anonymized and used solely for this
                        purpose.
                    </li>
                    <li>
                        <strong>Improving Services:</strong> We analyze usage
                        data to enhance our website's functionality, content,
                        and features.
                    </li>
                </ol>
            </div>
            <div className="">
                <h2 className="text-xl font-semibold text-gray-300">
                    Data Security
                </h2>

                <p>
                    We take data security seriously and employ reasonable
                    measures to protect your data. However, no method of
                    transmission or storage on the internet is completely
                    secure. While we strive to protect your data, we cannot
                    guarantee its absolute security.
                </p>

                <h2 className="text-xl font-semibold text-gray-300">
                    Disclosure of Your Information
                </h2>

                <p>We may share your data in the following circumstances:</p>

                <ol>
                    <li>
                        <strong>With Your Consent:</strong> We may share your
                        data with your explicit consent or at your direction.
                    </li>
                    <li>
                        <strong>Legal Requirements:</strong> We may disclose
                        your data if required to do so by law or in response to
                        valid legal requests.
                    </li>
                </ol>
            </div>
            <div className="mb-20">
                <h2>Your Choices</h2>

                <p>You have the following rights regarding your data:</p>

                <ol>
                    <li>
                        <strong>Access and Correction:</strong> You can access
                        and correct your data through your matchingbeats account
                        settings.
                    </li>
                    <li>
                        <strong>Deletion:</strong> You can request the deletion
                        of your account and data by contacting us.
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default PrivacyPolicyDialog;
