import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AppContext } from '@/context/AppContext';

// Shadcn/ui Imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Heart } from 'lucide-react';
import { Share } from 'lucide-react';
import { Landmark } from 'lucide-react';
import { Earth } from 'lucide-react';
import { PersonStanding } from 'lucide-react';
import { Ruler } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Languages } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';

import safetyRatings from "../assets/safetyRatings";

// Components Imports
import Flights from '@/components/Flights';
import CountryImages from "../components/CountryImages";
import PlaceRecommendations from "../components/PlaceRecommendations";
import Map from '@/components/Map';

const API_URL = import.meta.env.VITE_BACKEND_URL;


const DestinationDetail = () => {
    const { country } = useParams();
    const [countryData, setCountryData] = useState(null);
    const location = useLocation();
    const [description, setDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useContext(AppContext);

    const cost = location.state?.cost || "N/A";

    // Save to Favourites
    const [saved, setSaved] = useState(false);

    const toggleFavorite = async () => {
        if (!token) {
            alert("Please log in to save favorites.");
            return;
        }

        if (saved) {
            try {
                const response = await fetch(`${API_URL}/api/favorites/remove/${country}`, {
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
        } else {

            const placesKey = `places_${country}`;
            const places = localStorage.getItem(placesKey) ? JSON.parse(localStorage.getItem(placesKey)) : [];

            const requestData = {
                country,
                description,
                [placesKey]: places,
            };

            try {
                const response = await fetch(`${API_URL}/api/favorites/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestData),
                });

                const result = await response.json();
                if (result.success) {
                    setSaved(true);

                } else {
                    alert(result.error);
                }
            } catch (error) {
                console.error("Error saving favorite:", error);
            }
        }
    };

    useEffect(() => {
        if (location.state?.description) {
            setDescription(location.state.description);

        }

        const fetchCountryData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Request from "Rest Countries API (V2)""
                const response = await fetch(`https://restcountries.com/v2/name/${encodeURIComponent(country)}`);
                if (!response.ok) throw new Error(`Can not provide Information for: ${country}`);
                const data = await response.json();

                setCountryData(data[0]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountryData();
    }, [country]);

    useEffect(() => {
        const checkIfSaved = async () => {
            if (!token) return;
            try {
                const response = await fetch(`${API_URL}/api/favorites`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (result.success) {

                    setSaved(result.favorites.some(fav => fav.country === country));
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Favoriten:", error);
            }
        };

        checkIfSaved();
    }, [token, country]);


    if (loading) return <div className='flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
    </div>
    if (error) return <div className='px-8 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'><p>Error: {error}</p></div>;

    const { name, capital, region, population, area, timezones, languages, currencies, flags, maps } = countryData;

    // Country Safety Index
    const countrySafety = safetyRatings.find((item) => item.country === name);

    // Country Safety Index based Color
    const getSafetyColor = (rating) => {
        if (rating <= 33) return "text-red-500";
        if (rating <= 66) return "text-orange-500";
        return "text-green-500";
    };

    // Country Safety Badge based Color
    const getSafetyBadgeColor = (rating) => {
        if (rating <= 33) return "bg-red-500 text-white";
        if (rating <= 66) return "bg-orange-500 text-white";
        return "bg-green-500 text-white";
    };


    return (
        <div className='px-8 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>
            <div className='flex flex-row justify-between mb-8'>
                <div>
                    <Link to="/find-destination">
                        <div className=''>
                            <Button>
                                <div className=' flex flex-row items-center '>
                                    <ArrowLeft className=''></ArrowLeft>
                                    <p className=''>back to Countries-List</p>
                                </div>
                            </Button>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-row gap-2'>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={toggleFavorite}>
                                <Heart fill={saved ? "red" : "none"} strokeWidth={saved ? 0 : 2} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            {saved ? "Remove from Favorites" : "Save to Favorites"}
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline"
                                size="icon">
                                <Share></Share>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            Share this Page
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className='flex flex-row items-center justify-between mb-4'>
                <h1 className='text-5xl md:text-6xl lg:text-6xl mr-4'>{name}</h1>
                <img src={flags.svg} alt={`${name} Flag`} className='w-20 md:w-40' />
            </div>
            <p className='mb-4 text-xl text-[--light]'>{description || "No description provided."}</p>
            <div className='flex flex-row items-center text-green-500 mb-10'>
                <p className='text-green-500 mr-2 text-xl'>{cost}</p>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            className="cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                        <p>Estimated cost 1 person for 5 days. In this case {cost}</p>
                    </TooltipContent>
                </Tooltip>

            </div>
            <CountryImages countryName={name} />
            <h2 className='text-[--light] text-md mb-4 mt-8'>General Information:</h2>
            <Table className="mb-8">
                <TableBody className="text-md">

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <Landmark />Capital:
                            </div>
                        </TableCell>
                        <TableCell>{capital}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <Earth />Region:
                            </div>
                        </TableCell>
                        <TableCell>{region}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <PersonStanding />Population:
                            </div>
                        </TableCell>                        <TableCell>{population.toLocaleString()}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <Ruler />Area:
                            </div>
                        </TableCell>                        <TableCell>{area.toLocaleString()} km²</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <Clock />Timezones:
                            </div>
                        </TableCell>
                        <TableCell>{timezones.join(', ')}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <Languages />Languages:
                            </div>
                        </TableCell>
                        <TableCell>{languages.map(lang => lang.name).join(', ')}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <DollarSign />Currencys:
                            </div>
                        </TableCell>                        <TableCell>{currencies.map(curr => `${curr.name} (${curr.code})`).join(', ')}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>
                            <div className='flex flex-row items-center gap-2'>
                                <ShieldAlert />Safety Rating:
                            </div>
                        </TableCell>                          <TableCell>
                            {countrySafety ? (
                                <Badge className={`${getSafetyBadgeColor(countrySafety.rating)} px-3 py-1 rounded-lg`}>
                                    {countrySafety.rating}/100
                                </Badge>
                            ) : (
                                <p>No data available</p>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Map location={name} zoom={-50} />

            <h2 className="mt-20 text-3xl mb-2">Recommended Places in {name}</h2>
            <p className='text-[--light] mb-8'>Based on your preferences, intrests and budget: These are the Places you have to see</p>
            <PlaceRecommendations country={name} />

            <h2 className='mt-10 text-4xl md:text-5xl mb-4'>Cheapest Flights</h2>
            <p className='text-[--light] mb-4'>Rely on the cheapest Flights on the market.</p>
            <Flights></Flights>
            <h2 className='mt-20 text-4xl md:text-5xl mb-4'>Top Accommodations</h2>
            <p className='text-[--light] mb-4'>Top Accomodations that perfectly fit your needs and budget.</p>
            <Flights></Flights>
        </div >
    );
};

export default DestinationDetail;
