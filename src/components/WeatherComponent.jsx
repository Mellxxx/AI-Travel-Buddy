import { useEffect, useState } from "react";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherComponent = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location) return;

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
                );

                if (!response.ok) {
                    throw new Error(`API-Fehler: ${response.status}`);
                }

                const data = await response.json();
                setWeather({
                    temp: data.current.temp_c,
                    condition: data.current.condition.text,
                    icon: data.current.condition.icon,
                    wind: data.current.wind_kph,
                    humidity: data.current.humidity,
                });
            } catch (error) {
                setError("Fehler beim Abrufen des Wetters.");
                console.error("❌ Wetter API Fehler:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [location]);

    if (loading) return <p>Lädt Wetterdaten...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="dark:bg-[#111e41] text-black dark:text-slate-100 p-4 flex items-center w-full h-full rounded-xl ">
            <div>
                <div className="flex flex-row gap-4 items-center">
                    <p className="md:text-2xl text-xl text-slate-600 dark:text-slate-300">{weather.temp}°C</p>
                    <img src={weather.icon} alt="Wetter Icon" className="w-8 h-8 md:w-14 md:h-14 mr-3" />
                </div>
                <p className="text-sm md:text-md text-slate-600 dark:text-slate-300">{weather.condition}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 md:block hidden">Wind: {weather.wind} km/h</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 md:block hidden">Humidity: {weather.humidity}%</p>
                <a href="https://www.weatherapi.com/" target="_blank">
                    <p className="underline text-xs md:text-sm text-[--light] dark:text-slate-500 cursor-pointer">www.weatherapi.com</p>
                </a>
            </div>
        </div>
    );
};

export default WeatherComponent;
