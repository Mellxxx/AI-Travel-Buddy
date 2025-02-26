import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { Heart } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Favorites = () => {
    const { token } = useContext(AppContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${API_URL}/api/favorites`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await response.json();
                if (result.success) {
                    setFavorites(result.favorites);
                }
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [token]);

    if (!token) return <p>Please log in to view your favorites.</p>;
    if (loading) return <div className='flex justify-center items-center'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
    </div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-6">Your Favorite Destinations</h1>
            {favorites.length === 0 ? (
                <p>No favorites saved yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((fav) => (
                        <Link
                            to={`/favorites/${fav.id}`}
                            key={fav.id}
                            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex flex-row items-center gap-4">

                                <h2 className="text-xl font-bold">{fav.country}</h2>
                                <Heart fill="red" stroke="red" className="" />
                            </div>
                            <p className="text-sm text-gray-500">{fav.description}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
