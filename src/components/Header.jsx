import React from 'react'
import { Link, NavLink } from "react-router-dom";

import ModeToggle from './ModeToggle';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Home } from "lucide-react";

const Header = () => {
    return (
        <div className='w-full h-40 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-0 h-20 flex flex-row items-center justify-between'>
            <p className='text-xl '>AI Travel Buddy</p>
            <div className='flex flex-row items-center gap-8'>
                <Link to="/find-destination">
                    <p className='hidden md:block text-[--light] cursor-pointer hover:underline dark:hover:text-white hover:text-black transition'>find Destination</p>
                </Link>
                <Link to="/itineraries">
                    <p className='hidden md:block text-[--light] cursor-pointer hover:underline dark:hover:text-white hover:text-black transition'>explore Itineraries</p>
                </Link>
                <Link to="create-itinerary">
                    <p className='hidden md:block text-[--light] cursor-pointer hover:underline dark:hover:text-white hover:text-black transition'>create Itinerary</p>
                </Link>
            </div>

            <div className='flex flex-row items-center gap-2 md:gap-4'>
                {/* <Button>Login</Button> */}
                <ModeToggle className="flex-end"></ModeToggle>
                {/* <Button>
                    <Home></Home>
                </Button> */}
                <div className='md:hidden'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Home />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <NavLink to="/find-destination">
                                <DropdownMenuItem>
                                    find Destination
                                </DropdownMenuItem>
                            </NavLink>
                            <Link to="/itineraries">
                                <DropdownMenuItem >
                                    explore Itineraries
                                </DropdownMenuItem>
                            </Link>
                            <Link to="/create-itinerary">
                                <DropdownMenuItem >
                                    create Itinerary
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>
        </div>
    )
}

export default Header
