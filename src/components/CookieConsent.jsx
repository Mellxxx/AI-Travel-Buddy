import React from "react";
import ReactCookieConsent from "react-cookie-consent";
import { Button } from "@/components/ui/button";

const CookieConsent = ({ onAccept }) => {
    return (
        <div className="flex justify-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <ReactCookieConsent
                style={{
                    background: "#1e293bf7",
                    borderColor: "#3d4756",
                    border: "1px solid",
                    width: "100%",
                    maxWidth: "1200px",
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderRadius: "10px",
                    padding: "16px",
                    margin: " 50px 0 50px 0"
                }}
                location="bottom"
                cookieName="cookieConsent"
                enableDeclineButton
                onAccept={onAccept}
                containerClasses="w-full mx-auto my-4 px-6 py-4 rounded-lg shadow-lg text-white"
                buttonWrapperClasses="flex gap-2 mt-2 md:mt-0"
                buttonText="Accept"
                declineButtonText="Decline"
                buttonStyle={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    padding: "10px 30px",
                    borderRadius: "10px",
                }}
                declineButtonStyle={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    padding: "10px 30px",
                    borderRadius: "10px",
                }}
            >
                <h2 className="text-xl font-semibold">We value your privacy</h2>
                <p className="text-sm">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.  {" "}
                    <a href="/privacy-policy" className="underline text-green-400">
                        Privacy Policy
                    </a>

                </p>
            </ReactCookieConsent>
        </div>);
};

export default CookieConsent;
