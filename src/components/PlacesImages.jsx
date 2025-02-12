import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "./ui/tooltip";


const PlacesImages = ({ place }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: place, per_page: 5, "width": 2448,
                        "height": 3264,
                    },
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Unsplash API Key
                    },
                });
                setImages(response.data.results);
            } catch (error) {
                console.error('Fehler beim Abrufen der Bilder:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [place]);

    return (
        <div>
            <div className='grid grid-cols-5 gap-2 mt-4 hidden md:hidden'>
                {loading &&
                    Array(5) // Platzhalter für 6 Skelette
                        .fill(0)
                        .map((_, index) => (
                            <div className="relative w-full overflow-hidden rounded-lg animate-pulse bg-slate-100 dark:bg-blue-900 aspect-square" key={index}></div>
                        ))
                }
                {!loading &&
                    images.map((image) => (
                        <Tooltip key={image.id}>
                            <TooltipTrigger asChild>
                                <div className='hover:border-2 border-2 border-white dark:border-[#020817] dark:hover:border-slate-200 hover:border-yellow-400 transition relative w-full overflow-hidden rounded-lg shadow-md aspect-square'>
                                    <img
                                        key={image.id}
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        className='absolute inset-0 w-full h-full object-cover'
                                    />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                {image.description ? <p>{image.description}</p> : <p>{image.alt_description}</p>}
                            </TooltipContent>
                        </Tooltip>
                    ))}
            </div>

            <div className=''>
                <div className="w-full max-w-4xl mx-auto">
                    <div id="slider" className="flex overflow-x-scroll space-x-8 rounded-3xl no-scrollbar">
                        {loading &&
                            Array(2)
                                .fill(0)
                                .map((_, index) => (
                                    <div className="flex-shrink-0 w-full w-full scroll-ml-4 relative w-full overflow-hidden rounded-3xl  animate-pulse bg-slate-100 dark:bg-blue-900 aspect-square" key={index}></div>
                                ))
                        }
                        {!loading &&
                            images.map((image) => (
                                <div key={image.id} className="flex-shrink-0 scroll-ml-2">
                                    <img
                                        key={image.id}
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        className='w-full h-[320px] object-cover rounded-3xl' />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PlacesImages;
