import { useState } from "react";
import axios from "axios";

const FlightSearch = () => {
    const [departureAirport, setDepartureAirport] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [flights, setFlights] = useState([]);
    const API_KEY = "DEIN_SKYSCANNER_API_KEY"; // Ersetze mit deinem API-Key

    const searchFlights = async () => {
        try {
            const response = await axios.get(
                `https://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/DE/EUR/en-US/${departureAirport}/${destination}/${departureDate}`,
                {
                    headers: { "x-api-key": API_KEY },
                }
            );
            setFlights(response.data.Quotes);
        } catch (error) {
            console.error("Fehler beim Abrufen der Flüge:", error);
        }
    };

    return (
        <div className="max-w-lg md:max-w-full mx-auto p-6 bg-white dark:bg-[#060e22] shadow-lg rounded-lg relative">
            <input
                type="text"
                placeholder="Abflughafen (z.B. VIE für Wien)"
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                className="w-full p-2 dark:bg-[#060e22] mb-2 border rounded-md"
            />

            <input
                type="text"
                placeholder="Ziel (z.B. BCN für Barcelona)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2 dark:bg-[#060e22] mb-2 border rounded-md"
            />

            <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full p-2 dark:bg-[#060e22] mb-2 border rounded-md"
            />

            <button
                onClick={searchFlights}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Search Flights
            </button>

            {flights.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Günstigste Flüge:</h3>
                    <ul>
                        {flights.map((flight, index) => (
                            <li key={index} className="p-2 border-b">
                                ✈️ {flight.MinPrice} EUR - Abflug: {departureDate}
                                <a
                                    href={`https://www.skyscanner.de/transport/flights/${departureAirport}/${destination}/${departureDate}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-blue-500 underline"
                                >
                                    Jetzt buchen
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="absolute rounded-lg inset-0 dark:bg-black/50 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <h2 className="text-2xl text-[--light]">Coming Soon</h2>
            </div>


        </div>
    );
};

export default FlightSearch;
