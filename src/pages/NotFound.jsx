import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-6">
            <h1 className="text-6xl font-bold text-yellow-400">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-gray-500 mt-2">Oops! Looks like you got lost.</p>
            <p className="text-gray-500">Maybe it's time to plan your next trip instead?</p>

            <Button asChild className="mt-6 bg-yellow-400 hover:bg-yellow-500">
                <Link to="/find-destination">Find Destination</Link>
            </Button>
        </div>
    );
};

export default NotFound;
