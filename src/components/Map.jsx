import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const mapContainerStyle = {
    width: "100%",
    height: "320px",
    borderRadius: "20px", // 🎨 Runde Ecken
    overflow: "hidden", // Wichtig für die Abrundung
};

const mapOptions = {
    styles: [
        { elementType: "geometry", stylers: [{ color: "#060f22" }] }, // Dark Mode
        { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#172e61" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#575757" }] },
    ],
    disableDefaultUI: true,
    zoomControl: true,
};

const defaultCenter = { lat: 48.2082, lng: 16.3738 }; // Wien als Fallback

const MapComponent = ({ location }) => {
    const [coordinates, setCoordinates] = useState(defaultCenter);
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: MAPS_API_KEY });

    useEffect(() => {
        if (!location) return;

        const fetchCoordinates = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${MAPS_API_KEY}`
                );
                const data = await response.json();

                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;
                    setCoordinates({ lat, lng });
                }
            } catch (error) {
                console.error("❌ Fehler beim Laden der Location:", error);
            }
        };

        fetchCoordinates();
    }, [location]);

    if (!isLoaded) return <p>Lädt Google Maps...</p>;

    return (
        <div className="rounded-xl overflow-hidden"> {/* Tailwind für Abrundung */}
            <GoogleMap mapContainerStyle={mapContainerStyle} center={coordinates} zoom={5} options={mapOptions}>
                <MarkerF position={coordinates} />
            </GoogleMap>
        </div>
    );
};

export default MapComponent;
