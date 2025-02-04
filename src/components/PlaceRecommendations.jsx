import { useEffect, useState } from "react";
import PlacesImages from "./PlacesImages";

const PlaceRecommendations = ({ country }) => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lade User-Präferenzen aus dem localStorage
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

            // Anfrage an die API
            const response = await fetch("http://localhost:5000/api/places", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer b1083zgbhaubnpfjnd9ßqghr2",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            setPlaces(data.recommendations); // Ergebnisse in den State setzen

            // Ergebnisse für das Land in localStorage speichern
            localStorage.setItem(`places_${country}`, JSON.stringify(data.recommendations));
        } catch (err) {
            setError("An error occurred while retrieving places.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Lade existierende Daten aus localStorage
        const storedPlaces = localStorage.getItem(`places_${country}`);
        if (storedPlaces) {
            setPlaces(JSON.parse(storedPlaces)); // Falls vorhanden, Daten aus dem localStorage verwenden
        } else {
            fetchRecommendedPlaces(); // Falls nicht vorhanden, Serveranfrage starten
        }
    }, [country]);

    return (
        <div className="mt-10">
            {/* Ladeanzeige */}
            {loading &&
                Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            className="bg-white dark:bg-[#060e22] p-4 rounded-lg shadow-md border mb-8 h-[100px] w-full animate-pulse bg-slate-100 dark:bg-blue-900 aspect-square"
                            key={index}
                        ></div>
                    ))}

            {/* Fehleranzeige */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Orte anzeigen */}
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
