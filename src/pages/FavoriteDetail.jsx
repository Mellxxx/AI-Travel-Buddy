import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const FavoriteDetail = () => {
    const { id } = useParams();
    const [favorite, setFavorite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorite = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${id}`);

                if (!response.ok) throw new Error(`Error ${response.status}: Favorite not found`);

                const data = await response.json();
                setFavorite(data.favorite);
            } catch (error) {
                console.error("Error fetching favorite:", error);
                setError("Favorite not found");
            }
        };

        fetchFavorite();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!favorite) return <p>Favorite not found.</p>;

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold">{favorite.country}</h1>
            <p className="text-lg text-gray-600">{favorite.description}</p>

            <h2 className="text-2xl mt-6">Recommended Places</h2>
            <ul className="list-disc ml-6">
                {favorite.places.map((place, index) => (
                    <li key={index}>{place}</li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteDetail;
