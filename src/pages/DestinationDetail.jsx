import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

// Shadcn/ui Imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../components/ui/tooltip";
import { ArrowLeft } from "lucide-react";

import safetyRatings from "../assets/safetyRatings";

// Components Imports
import Flights from '@/components/Flights';
import CountryImages from "../components/CountryImages";
import PlaceRecommendations from "../components/PlaceRecommendations";
import Map from '@/components/Map';


const DestinationDetail = () => {
    const { country } = useParams();
    const [countryData, setCountryData] = useState(null);
    const location = useLocation();
    const [description, setDescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cost = location.state?.cost || "N/A";

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


    return (
        <div className='px-8 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>
            <Link to="/find-destination">
                <div className='p-2 rounded hover:bg-slate-100 w-[200px] dark:hover:bg-[--test] transition'>
                    <div className='flex flex-row items-center gap-0'>
                        <ArrowLeft className='text-[--light]'></ArrowLeft>
                        <p className='text-[--light]'>back to Countries-List</p>
                    </div>
                </div>
            </Link>
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
                        <TableCell>Capital:</TableCell>
                        <TableCell>{capital}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Region:</TableCell>
                        <TableCell>{region}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Population:</TableCell>
                        <TableCell>{population.toLocaleString()}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Area:</TableCell>
                        <TableCell>{area.toLocaleString()} km²</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Timezone(s):</TableCell>
                        <TableCell>{timezones.join(', ')}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Language(s):</TableCell>
                        <TableCell>{languages.map(lang => lang.name).join(', ')}</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Currencie(s):</TableCell>
                        <TableCell>{currencies.map(curr => `${curr.name} (${curr.code})`).join(', ')}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell className="text-lg font-semibold">Safety Rating:</TableCell>
                        <TableCell className={`${getSafetyColor(countrySafety?.rating || 0)} text-lg font-semibold`}>
                            {countrySafety ? `${countrySafety.rating}/100` : "No data available"}
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
        </div>
    );
};

export default DestinationDetail;
