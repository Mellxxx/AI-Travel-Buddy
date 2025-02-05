import React, { useState, useEffect, useRef } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import FlagMarquee from '../components/FlagMarquee';
import ModeToggle from "../components/ModeToggle";
import { useNavigate } from 'react-router-dom';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../components/ui/tooltip";

import { sendGAEvent } from "../utils/analytics";

const API_URL = import.meta.env.VITE_BACKEND_URL;


const DestinationRecco = () => {
    const options = [
        "Relax", "Romantic", "Luxury", "Sport", "Hiking", "Snow", "Adventure",
        "Work", "Party", "Sight Seeing", "Beach", "Nature", "Cultural", "Food & Drink", "Shopping",
        "Spa & Wellness", "Family", "City Tour", "Nightlife", "Camping", "Wildlife", "Asia", "Europe", "Americas"
    ];

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
        "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Congo (Democratic Republic)",
        "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
        "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
        "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
        "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
        "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
        "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
        "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
        "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
        "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
        "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
        "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
        "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
        "Vietnam", "Yemen", "Zambia", "Zimbabwe", "none"
    ];

    const budgetOptions = ["$ low", "$$ medium", "$$$ higher", "$$$$ expensive"];

    // State-Variablen
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [budgetOption, setBudgetOption] = useState(null);
    const [customOptions, setCustomOptions] = useState([]);
    const [customInput, setCustomInput] = useState("");
    const [location, setLocation] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    // Referenz für den Ladevorgang
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Präferenzen und Empfehlungen aus dem `localStorage` laden
    useEffect(() => {

        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            const { selectedOptions, customOptions, budgetOption, location } = JSON.parse(savedPreferences);
            setSelectedOptions(selectedOptions || []);
            setCustomOptions(customOptions || []);
            setBudgetOption(budgetOption || null);
            setLocation(location || "");
        }
    }, []);

    useEffect(() => {

        if (isInitialLoad) {
            setIsInitialLoad(false); // Erstes Laden abschließen
            return;
        }

        // Speichere Präferenzen im localStorage, wenn sich die State-Variablen geändert haben
        const preferences = {
            selectedOptions,
            customOptions,
            budgetOption,
            location,
        };
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }, [selectedOptions, customOptions, budgetOption, location]);


    // Navigation to Country Description Page
    const navigate = useNavigate();


    const handleCountryClick = (country) => {
        // Beschreibung aus den Empfehlungen finden
        const recommendation = recommendations.find(rec => rec.country === country);
        const description = recommendation ? recommendation.description : "No description available."; // Fallback-Wert
        const cost = recommendation ? recommendation.cost : "No description available."; // Fallback-Wert


        // Navigation zur Detailseite mit dem Länder-Namen und der Beschreibung
        navigate(`/destination/${encodeURIComponent(country)}`, { state: { description, cost } });
    };


    const toggleSelection = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    };

    const toggleSelectionBudget = (option) => {
        setBudgetOption((prev) => (prev === option ? null : option));
    };

    const handleCustomInput = (e) => {
        setCustomInput(e.target.value);
    };

    const handleAddCustomOption = () => {
        if (customInput.trim() !== "" && !customOptions.includes(customInput)) {
            setCustomOptions((prev) => [...prev, customInput]);
            setCustomInput("");
        }
    };

    const finalSelection = [...customOptions, ...selectedOptions, budgetOption].filter(Boolean);

    const selection = [...customOptions, ...selectedOptions].filter(Boolean)


    // ***********  Sending Request to the Server and Recieving Answer  ************
    const sendPreferences = async () => {
        const requestData = {
            preferences: [...selectedOptions, ...customOptions].filter(Boolean),
            budget: budgetOption,
            location: location
        };

        try {
            setIsLoading(true);
            setError(null); // Fehler-Status zurücksetzen

            const response = await fetch(`${API_URL}/api/recommendations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer b1083zgbhaubnpfjnd9ßqghr2",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            // Vor dem Speichern der neuen Empfehlungen die alten entfernen
            localStorage.removeItem('recommendations');

            // Empfehlungen im State speichern
            setRecommendations(data.recommendations);

            // Empfehlung im Local Storage speichern
            localStorage.setItem('recommendations', JSON.stringify(data.recommendations));

            // Google Analytics Tracking
            sendGAEvent("api_success", {
                category: "Success",
                label: "Destination: API Request was successful",
            });


        } catch (error) {

            // Google Analytics Error-Tracking
            sendGAEvent("api_error", {
                category: "Error",
                label: `Destination: API Request failed: ${error.message}`,
            });

            console.error("Error while sending your data:", error);
            setError("An Error accured while retrieving your Recommendation. ");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Empfehlungen aus dem localStorage laden
        const savedRecommendations = localStorage.getItem('recommendations');
        if (savedRecommendations) {
            setRecommendations(JSON.parse(savedRecommendations));
        }
    }, []);

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>

            <div className='text-center mt-10 mb-4'>
                <h1 className='text-3xl md:text-4xl'>Find your perfect Vacation Destination</h1>
                <p className='text-[--light]'>Ask AI Travel Buddy</p>
            </div>

            {/* <------ Countrys Animation -------> */}
            <FlagMarquee />

            <h2 className='text-center text-2xl mb-4 mt-4'>Select your Interests:</h2>
            <p className='text-[--light] text-center'>AI can evaluate your perfect Vacation Destination based on your preferences. Get inspired.</p>

            {/* Container for higher Margin */}
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>

                {/* <------- Activitys to select -------> */}
                <p className='mt-8 mb-4'>Activities: <span className='text-[--light]'>select multiple</span></p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {options.map((option) => (
                        <button key={option} onClick={() => toggleSelection(option)}
                            className={`px-4 py-2 rounded-md border-2 transition-all ${selectedOptions.includes(option) ? "bg-blue-500 text-white border-blue-500" : "bg-white dark:bg-[#060e22] dark:border-gray-600 dark:text-white text-gray-700 border-gray-300"}`}>{option}</button>
                    ))}
                </div>

                {/* <-------- Custom Activity or preference Input -------> */}
                <div className="mt-4 flex space-x-2">
                    <input
                        className="p-2 border-2 border-gray-300 rounded-md dark:bg-[#060e22] dark:border-gray-600 dark:text-white focus:border-blue-500 text-gray-700 text-center w-full"
                        placeholder='Custom preference..'
                        value={customInput}
                        onChange={handleCustomInput}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md "
                        onClick={handleAddCustomOption}
                    >
                        Add
                    </button>
                </div>

                {/* <------- Select Residence -------> */}
                <div className='mt-8 mb-8'>
                    <label className="mr-4 mb-4" htmlFor="residence">Select your current residence:</label>

                    <select
                        className="p-2 border-2 border-grey-300 rounded-md dark:bg-[#060e22] dark:border-gray-600 dark:text-white"
                        id="residence"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}

                    >
                        <option value="" disabled>Select a country</option>
                        {countries.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* <-------- Budget Select --------> */}
                <p className='mt-8'>Budget: <span className='text-[--light]'>select one</span></p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-4 gap-4'>
                    {budgetOptions.map((option) => (
                        <button key={option} onClick={() => toggleSelectionBudget(option)}
                            className={`px-4 py-2 rounded-md border-2 transition-all ${budgetOption === option ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-700 border-gray-300 dark:bg-[#060e22] dark:border-gray-600 dark:text-white"}`}>{option}</button>
                    ))}
                </div>

                {/* <-------- All selections summary --------> */}
                <div className="mt-4"><strong>Selected Interests:</strong> {selection.length > 0 ? selection.join(", ") : "None"}</div>
                <div className="mt-4 mb-4"><strong>Selected Budget:</strong> {budgetOption ? budgetOption : "None"}</div>
                <div className="mt-4 mb-10"><strong>Selected Location:</strong> {location ? location : "None"}</div>

                {/* Send the request Button */}
                <div className='w-full flex justify-center mb-10'>
                    <button onClick={sendPreferences} className='p-4 bg-yellow-400 rounded-xl hover:bg-black dark:hover:bg-white dark:hover:text-black dark:bg-blue-500 transition hover:text-white text-xl'>
                        Find the right Destination
                    </button>
                </div>
            </div>

            {/* <-------- Results  --------> */}
            <h2 className='text-center text-2xl md:text-4xl mb-8'>Matching Results:</h2>
            <div className='md:p-10 p-4 rounded-xl bg-slate-100 mb-20 dark:bg-[#060e22] dark:border-gray-600 dark:text-white'>
                {isLoading ? (
                    <div className='flex justify-center items-center'>
                        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
                    </div>
                ) : error ? (
                    <p className='text-center text-red-500'>{error}</p>
                ) : recommendations.length > 0 ? (
                    <>
                        {/* Anzeige der Präferenzen */}
                        <div className='mb-8'>
                            <h3 className='text-xl font-bold mb-2'>Your Selections:</h3>
                            <p><strong>Interests:</strong> {selection.length > 0 ? selection.join(", ") : "None"}</p>
                            <p><strong>Budget:</strong> {budgetOption ? budgetOption : "None"}</p>
                            <p><strong>Location:</strong> {location ? location : "None"}</p>
                        </div>
                        {/* Empfehlungen darstellen */}
                        {recommendations.map(({ country, description, cost }) => {
                            const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(country)}+Vacation`;
                            return (
                                <div onClick={() => handleCountryClick(country, description, cost)} key={country} className='mb-8 bg-slate-200 cursor-pointer border-2 dark:hover:border-white hover:border-slate-400 transition dark:bg-[#263245f7] p-4 rounded-md'>
                                    <p className='text-2xl'>{country}</p>
                                    <p className='text-[--light]'>{description}</p>
                                    <div className='flex flex-row items-center text-green-500'>
                                        <p className='text-green-500 mr-2'>{cost}</p>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button className="cursor-pointer">
                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                <p>Estimated cost 1 person for 5 days. In this case {cost}</p>
                                            </TooltipContent>
                                        </Tooltip>

                                    </div>
                                    <a href={googleSearch} target='_blank' rel='noopener noreferrer' className='underline text-blue-500'>
                                        "{country} Vacation" Google results
                                    </a>
                                </div>
                            );
                        })}
                    </>

                ) : (
                    <p className='text-center text-gray-500 '>No recommendations jet. Please select your preferences and klick on "Find the right Destination".</p>
                )}
            </div>

        </div >
    )
}

export default DestinationRecco
