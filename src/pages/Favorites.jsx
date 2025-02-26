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
    if (loading) return <p>Loading...</p>;

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
                            <h2 className="text-xl font-bold">{fav.country}</h2>
                            <p className="text-sm text-gray-500">{fav.description}</p>
                            <Heart fill="red" stroke="red" className="mt-2" />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
