import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PLACES_API_URL = import.meta.env.VITE_MAPS_API_KEY;

const TemperatureChart = ({ location }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCoordinates = async (place) => {
        const apiKey = `${PLACES_API_URL}`;
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`
        );
        const result = await response.json();
        if (result.status === "OK") {
            return result.results[0].geometry.location;
        }
        throw new Error("Location not found");
    };

    const fetchTemperatureData = async (lat, lng) => {
        try {
            const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lng}&climate_variable=temperature_2m_max&start_year=2000&end_year=2023`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.climate && result.climate.monthly) {
                const orderedMonths = [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];

                const formattedData = orderedMonths.map((month, index) => ({
                    month,
                    temp: result.climate.monthly.temperature_2m_max[index]?.toFixed(1) || null
                }));

                console.log("DEBUG: Fetched Data", formattedData);
                setData(formattedData);
            } else {
                throw new Error("No temperature data found");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                if (typeof location === "string") {
                    const { lat, lng } = await fetchCoordinates(location);
                    await fetchTemperatureData(lat, lng);
                } else if (location.lat && location.lng) {
                    await fetchTemperatureData(location.lat, location.lng);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [location]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={2} connectNulls={true} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TemperatureChart;