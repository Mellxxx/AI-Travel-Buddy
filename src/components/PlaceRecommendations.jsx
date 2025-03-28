import { useEffect, useState } from "react";
import PlacesImages from "./PlacesImages";

import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../components/ui/tooltip";

import Map from "./Map";
import WeatherComponent from "./WeatherComponent";

import { sendGAEvent } from "../utils/analytics";
import MapSmall from "./MapSmall";
import TemperatureChart from "./TemperatureChart";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const PlaceRecommendations = ({ country }) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // load user preferences
    const getUserPreferences = () => {
        const storedPreferences = localStorage.getItem("userPreferences");
        return storedPreferences ? JSON.parse(storedPreferences) : {};
    };

    const fetchRecommendedPlaces = async () => {
        const { selectedOptions, customOptions, budgetOption } = getUserPreferences();

        const requestData = {
            preferences: [...selectedOptions, ...customOptions].filter(Boolean),
            budget: budgetOption,
            country: country,
        };

        try {
            setLoading(true);
            setError(null);

            console.log("Sending request data:", requestData);

            // API Request
            const response = await fetch(`${API_URL}/api/places`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer b1083zgbhaubnpfjnd9ßqghr2",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            setPlaces(data.recommendations); // Set to state

            // store places in localStorage
            localStorage.setItem(`places_${country}`, JSON.stringify(data.recommendations));

            // GA-4 Tracking
            sendGAEvent("api_success", {
                category: "Success",
                label: "Place: API Request was successful",
            });


        } catch (err) {
            setError("An error occurred while retrieving places.");
            console.error(err);

            // GA-4 Error-Tracking
            sendGAEvent("api_error", {
                category: "Error",
                label: `Place: API Request failed: ${error.message}`,
            });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // load existing places from localStorage
        const storedPlaces = localStorage.getItem(`places_${country}`);
        if (storedPlaces) {
            setPlaces(JSON.parse(storedPlaces));
        } else {
            fetchRecommendedPlaces();
        }
    }, [country]);


    return (
        <div className="mt-10 m-[-15px]">
            {loading &&
                Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            className="bg-white dark:bg-[#060e22] p-4 rounded-lg shadow-md border mb-8 h-[100px] w-full animate-pulse bg-slate-100 dark:bg-blue-900 aspect-square"
                            key={index}
                        ></div>
                    ))}

            {error && <p className="text-red-500">{error}</p>}

            {/* <------- display Places -------> */}
            <div className="mt-6">
                {places.map((place, index) => {
                    const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(country)}+Vacation`;

                    return (

                        <div key={index} className="bg-white dark:bg-[#060e22] p-6 rounded-3xl border mb-8">
                            <div className="flex w-full flex-row hidden md:flex justify-between ">
                                <h3 className="text-5xl">{place.place}</h3>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button className="cursor-not-allowed">create Itinerary</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        This Feature will be available soon
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <h3 className="text-3xl mb-4 md:hidden">{place.place}</h3>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8">
                                <div>
                                    <PlacesImages place={place.place} className=""></PlacesImages>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="rounded-3xl overflow-hidden border-white dark:border-[#020817]">
                                        <div className="hidden md:block">
                                            <Map location={place.place} className="hidden md:block"></Map>
                                        </div>
                                        <div className="md:hidden">
                                            <MapSmall location={place.place} className="md:hidden"></MapSmall>
                                        </div>
                                    </div>
                                    <div className="flex flex-col h-full gap-6">
                                        <div className="bg-slate-100 md:h-auto h-[100px] rounded-xl dark:bg-[#111e41] md:p-4 h-full">
                                            <WeatherComponent location={place.place}></WeatherComponent>
                                        </div>
                                        <div className="bg-slate-100 dark:bg-[#111e41] rounded-xl p-4 w-full h-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-3xl dark:bg-[#111e41] bg-slate-100 p-4 px-6 mt-6">
                                <p className="dark:text-slate-300 text-slate-600 mb-4 lg:text-lg">{place.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PlaceRecommendations;
