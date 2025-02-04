import { useEffect, useState } from "react";

const GoogleMap = ({ countryName }) => {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const API_KEY = "DEIN_GOOGLE_MAPS_API_KEY"; // 🔥 Ersetze mit deinem API Key

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                        countryName
                    )}&key=${API_KEY}`
                );
                const data = await response.json();

                if (data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    setCoordinates({ lat: location.lat, lng: location.lng });
                } else {
                    console.error("Kein Standort gefunden für:", countryName);
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Koordinaten:", error);
            }
        };

        fetchCoordinates();
    }, [countryName]);

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(
                    countryName
                )}&zoom=5&maptype=roadmap`}
            ></iframe>
        </div>
    );
};

export default GoogleMap;
