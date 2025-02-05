import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Thomas from "../assets/ThomasIco.png";

const DonationPopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 120000); // Popup after 1 Minute

        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
            <DialogContent className="max-w-md mx-auto p-6 text-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl">Consider Donating</DialogTitle>
                    <DialogDescription className="text-gray-500">
                        <div className="bg:slate-200 dark:bg-[#060e22] p-4 rounded-xl">
                            <div className="flex flex-row bg:slate-200 dark:bg-[#060e22] rounded-lg items-center mb-4">
                                <img src={Thomas} alt="" className="w-14 h-14 mr-4" />
                                <p>Thomas form AI Travel Agent</p>
                            </div>
                            <p>
                                If you enjoy AI Travel Buddy, consider supporting me with a small donation.
                                Your support helps me keep AI Travel Buddy running!
                            </p>
                        </div>

                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => setShowPopup(false)} variant="outline">Maybe Later</Button>
                    <a href="https://buymeacoffee.com/tomljolo" target="_blank">
                        <Button className="bg-yellow-400 hover:bg-yellow-500" >Donate Now</Button>
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DonationPopup;
