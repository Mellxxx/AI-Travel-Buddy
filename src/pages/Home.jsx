import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaPlane, FaMapMarkerAlt, FaGlobe, FaRegStar } from "react-icons/fa";

import Earth from '../assets/Earth.png'
import FlagMarquee from "@/components/FlagMarquee";
import Selection from "../assets/selection.png";
import Custom from "../assets/Custom.png";
import Country from "../assets/country.png";
import Budget from "../assets/budget.png";

const Home = () => {
    return (
        <div className="px-4 sm:px-[1vw] md:px-[2vw] lg:px-[3vw] text-center">
            {/* Hero Section */}
            <section className="">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="px-2">
                        <div className="w-full flex items-start flex-row">
                            <div className="px-4 py-2 text-sm bg-blue-500 text-white dark:text-[#060f22] rounded-full mb-4">
                                Your AI-Powered Travel Guide
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                            Discover Your Perfect <span className="text-yellow-400">Vacation Destination</span>
                        </h1>
                        <p className="text-lg  mb-6 max-w-2xl text-left">
                            AI Travel Buddy finds the best travel spots based on your interests and budget.
                            Get personalized recommendations for your next adventure.
                        </p>
                        <div className="w-full flex md:items-start flex-row">
                            <Button asChild className="px-12 rounded-xl py-7 bg-yellow-400 hover:bg-yellow-500 text-lg">
                                <Link to="/find-destination">Find Your Destination</Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src={Earth} className="transform scale-120" />
                    </div>
                </div>
                <FlagMarquee></FlagMarquee>

            </section>

            {/* steps to find destination */}
            <section className="">
                <h2 className="mt-8 text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    Don´t know <span className="text-yellow-400">where to go?</span>
                </h2>
                <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left flex flex-row gap-4">
                    <p className="">
                        Choosing the perfect vacation destination can be overwhelming—so many options, so little time! Whether you’re dreaming of a relaxing beach getaway, a thrilling adventure, or a cultural city escape, finding the right place can feel like a challenge. That’s where AI Travel Buddy comes in!
                    </p>
                </div>
                <h2 className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    <span className="text-yellow-400">#1</span> Choose your Preferences
                </h2>
                <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left flex md:flex-row flex-col gap-2">
                    <img src={Selection} alt="checkbox for preferences" className="md:w-1/2" />
                    <p className="m-2 md:text-xl">
                        Whether you're looking for adventure, culture, relaxation, or a mix of everything, AI Travel Buddy tailors recommendations based on your interests and budget. Simply choose what excites you, and let AI do the rest!                    </p>
                </div>
                <h2 className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    <span className="text-yellow-400">#2</span> Add Custom Preferences
                </h2>
                <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left flex md:flex-row flex-col gap-2">
                    <img src={Custom} alt="input field for custom preferences" className="md:w-1/2" />
                    <p className="m-2 md:text-xl">
                        If you have unique preferences or special requirements, add them here! This helps AI Travel Buddy refine your recommendations even further, ensuring they truly match your travel style.                    </p>
                </div>
                <h2 className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    <span className="text-yellow-400">#3</span> Select Your Residence
                </h2>
                <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left flex md:flex-row flex-col gap-2">
                    <img src={Country} alt="input field for residence" className="md:w-1/2" />
                    <p className="m-2 md:text-xl">
                        Providing your current location allows AI Travel Buddy to factor in travel costs and flight durations, making your recommendations even more accurate.
                    </p>
                </div>
                <h2 className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    <span className="text-yellow-400">#4</span> Select Your Budget
                </h2>
                <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left flex md:flex-row flex-col gap-2">
                    <img src={Budget} alt="checkboxes for budget option" className="md:w-1/2" />
                    <p className="m-2 md:text-xl">
                        Choose a budget range that fits your travel plans. AI Travel Buddy will only suggest destinations that align with your financial preferences, so there are no surprises!                    </p>
                </div>
                <h2 className="mt-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-left">
                    <span className="text-yellow-400">#5</span> Generate Results
                </h2>
                <div>
                    <div className="rounded-xl p-4 dark:bg-[--dark-light] bg-slate-100 text-left">
                        <p className="m-2 md:text-xl">
                            With your preferences and budget in mind, our AI will instantly generate personalized travel suggestions. Ready to find your dream destination? Let’s go!
                        </p>
                    </div>

                </div>


            </section>



            {/* Feature Section */}
            {/* <section className="my-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="rounded-xl p-4 border">
                        <div className="flex w-full items-center justify-center mt-[-40px]">
                            <div className="rounded-full bg-white p-1">
                                <FaGlobe className="text-blue-500 text-5xl" />
                            </div>
                        </div>
                        <h3 className="text-xl mt-4">Global Travel Insights</h3>
                        <p className="mt-2 text-sm text-[--light]">Get recommendations for countries and cities worldwide.</p>
                    </div>
                    <div className="rounded-xl p-4 border">
                        <div className="flex w-full items-center justify-center mt-[-40px]">
                            <div className="rounded-full bg-white p-1">
                                <FaPlane className="text-green-500 text-5xl" />
                            </div>
                        </div>
                        <h3 className="text-xl mt-4">Cheapest Flights</h3>
                        <p className="mt-2 text-sm text-[--light]">Find budget-friendly flights tailored to your needs.</p>
                    </div>
                    <div className="rounded-xl p-4 border">
                        <div className="flex w-full items-center justify-center mt-[-40px]">
                            <div className="rounded-full bg-white p-1">
                                <FaMapMarkerAlt className="text-red-500 text-5xl" />
                            </div>
                        </div>
                        <h3 className="text-xl mt-4">Top Attractions</h3>
                        <p className="mt-2 text-sm text-[--light]">Discover must-see attractions based on your preferences.</p>
                    </div>
                    <div className="rounded-xl p-4 border">
                        <div className="flex w-full items-center justify-center mt-[-40px]">
                            <div className="rounded-full bg-white p-1">
                                <FaRegStar className="text-yellow-500 text-5xl" />
                            </div>
                        </div>
                        <h3 className="text-xl mt-4">Personalized Trips</h3>
                        <p className="mt-2 text-sm text-[--light] mb-6">AI-powered suggestions tailored just for you.</p>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="my-20 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Next Trip?</h2>
                <p className="text-gray-500 text-lg mb-6">Let AI Travel Buddy find the perfect place for you.</p>
                <Button asChild className="px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-lg">
                    <Link to="/find-destination">Start Exploring</Link>
                </Button>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, text }) => (
    <div className="p-6 bg-white dark:bg-[#060e22] rounded-lg shadow-lg text-center border">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">{text}</p>
    </div>
);

export default Home;
