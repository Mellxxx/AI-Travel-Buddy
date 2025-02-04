import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaPlane, FaMapMarkerAlt, FaGlobe, FaRegStar } from "react-icons/fa";

const Home = () => {
    return (
        <div className="px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-center">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center  rounded-xl h-[80vh] mt-4">
                <Badge className="bg-blue-500 text-white mb-4 text-lg px-4 py-2 mb-4">Your AI-Powered Travel Guide</Badge>
                <h1 className="text-5xl md:text-6xl mb-4 leading-tight">
                    Discover Your Perfect <span className="text-yellow-400">Vacation Destination</span>
                </h1>
                <p className="text-lg text-gray-500 mb-6 max-w-2xl">
                    AI Travel Buddy finds the best travel spots based on your interests and budget.
                    Get personalized recommendations for your next adventure.
                </p>
                <Button asChild className="px-10 py-6 bg-yellow-400 hover:bg-yellow-500 text-lg">
                    <Link to="/find-destination">Find Your Destination</Link>
                </Button>

            </section>

            {/* Feature Section */}
            <section className="my-20">
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
            </section>

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
