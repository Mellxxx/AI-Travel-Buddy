import { useEffect, useState } from "react";
import PlacesImages from "./PlacesImages";

import { sendGAEvent } from "../utils/analytics";

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
        <div className="mt-10">
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

                        <div key={index} className="bg-white dark:bg-[#060e22] p-6 rounded-lg shadow-md border mb-8">
                            <h3 className="text-3xl mb-4">{place.place}</h3>
                            <p className="text-[--light] mb-4">{place.description}</p>
                            <p>
                                <a href={googleSearch} target='_blank' rel='noopener noreferrer' className='underline text-blue-500'>
                                    "{place.place} Vacation" Google results
                                </a>
                            </p>
                            <PlacesImages place={place.place} className="mt-4"></PlacesImages>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PlaceRecommendations;
