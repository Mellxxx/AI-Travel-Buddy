import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

// UI Imports
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Heart, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import safetyRatings from "../assets/safetyRatings";

// Components
import Flights from "@/components/Flights";
import CountryImages from "../components/CountryImages";
import Map from "@/components/Map";
import PlacesImages from "@/components/PlacesImages";
import MapSmall from "@/components/MapSmall";
import WeatherComponent from "@/components/WeatherComponent";



const API_URL = import.meta.env.VITE_BACKEND_URL;

const FavoriteDetail = () => {
    const { id } = useParams();
    const { token } = useContext(AppContext);

    const [favorite, setFavorite] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saved, setSaved] = useState(true);

    // 🟢 1️⃣ Favoriten-Daten abrufen
    useEffect(() => {
        const fetchFavorite = async () => {
            if (!token) {
                setError("No token available. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/favorites/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Favorite not found`);
                }

                const data = await response.json();
                setFavorite(data.favorite);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorite();
    }, [id, token]);

    // 🟢 2️⃣ Länder-Daten abrufen
    useEffect(() => {
        const fetchCountryData = async () => {
            if (!favorite || !favorite.country) return;

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(favorite.country)}`);

                if (!response.ok) {
                    console.warn(`RestCountries API failed for ${favorite.country}, trying v2...`);
                    const fallbackResponse = await fetch(`https://restcountries.com/v2/name/${encodeURIComponent(favorite.country)}`);
                    if (!fallbackResponse.ok) throw new Error(`Could not fetch data for ${favorite.country}`);

                    const fallbackData = await fallbackResponse.json();
                    setCountryData(fallbackData[0]);
                } else {
                    const data = await response.json();
                    setCountryData(data[0]);
                }
            } catch (err) {
                console.error("Error fetching country data:", err);
                setError(err.message);
            }
        };

        fetchCountryData();
    }, [favorite]); // 🔥 WICHTIG: Hängt nur von `favorite` ab, nicht von `country`

    // 🟢 3️⃣ Favoriten entfernen
    const removeFavorite = async () => {
        if (!token) {
            alert("Please log in to remove favorites.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/favorites/remove/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (result.success) {
                setSaved(false);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    // 🛑 Fehler-Handling & Ladeanzeige
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!favorite) return <p>No favorite found.</p>;

    const { country, description, places } = favorite;
    const countrySafety = safetyRatings.find((item) => item.country === country);

    // Safety Badge Colors
    const getSafetyBadgeColor = (rating) => {
        if (rating <= 33) return "bg-red-500 text-white";
        if (rating <= 66) return "bg-orange-500 text-white";
        return "bg-green-500 text-white";
    };

    return (
        <div className="px-8 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5">
            <div className="flex flex-row justify-between mb-8">
                <div>
                    <Link to="/favorites">
                        <Button>
                            <ArrowLeft />
                            <p>Back to Favorites</p>
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-row gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={removeFavorite}>
                                <Heart fill={saved ? "red" : "none"} strokeWidth={saved ? 0 : 2} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{saved ? "Remove from Favorites" : "Save to Favorites"}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <Share />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy Link</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-6xl mb-4">{country}</h1>
            <p className="mb-4 text-xl text-[--light]">{description || "No description provided."}</p>

            <CountryImages countryName={country} />

            <h2 className="text-[--light] text-md mb-4 mt-8">General Information:</h2>
            <Table className="mb-8">
                <TableBody className="text-md">
                    {countryData && (
                        <>
                            <TableRow>
                                <TableCell>Capital:</TableCell>
                                <TableCell>{countryData.capital || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Region:</TableCell>
                                <TableCell>{countryData.region || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Population:</TableCell>
                                <TableCell>{countryData.population?.toLocaleString() || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Area:</TableCell>
                                <TableCell>{countryData.area?.toLocaleString() || "N/A"} km²</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Languages:</TableCell>
                                <TableCell>{countryData.languages ? Object.values(countryData.languages).join(", ") : "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Currencies:</TableCell>
                                <TableCell>{countryData.currencies ? Object.values(countryData.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(", ") : "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Safety Rating:</TableCell>
                                <TableCell>
                                    {countrySafety ? (
                                        <Badge className={`${getSafetyBadgeColor(countrySafety.rating)} px-3 py-1 rounded-lg`}>
                                            {countrySafety.rating}/100
                                        </Badge>
                                    ) : (
                                        <p>No data available</p>
                                    )}
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>

            <Map location={country} zoom={-50} />
            <h2 className="mt-20 text-3xl mb-2">Recommended Places in {country}</h2>
            <p className="text-[--light] mb-8">These are the places you have to see:</p>
            {places.length > 0 ? (
                places.map((place, index) => {
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
                                <p className="dark:text-slate-300 mb-4 lg:text-lg">{place.description}</p>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>No places found.</p>
            )}
        </div>
    );
};

export default FavoriteDetail;

