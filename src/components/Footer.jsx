import React from 'react'
import { Link } from "react-router";
import Favicon from "../assets/Favicon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <div className=' w-full pb-5'>
            <div className='px-6 sm:px-[6vw] md:px-[8vw] lg:px-[10vw] flex flex-col sm:grid grid-cols-[1fr_1fr_1fr] px-8 pt-10 sm:px-[5ve] md:px-[7vw] lg:px-[9vw] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <div className='flex flex-row gap-4 items-center'>
                        <img src={Favicon} className='w-10 h-10' alt="" />
                        <p className='md:text-xl text-lg'>Webaffinity e.U.</p>
                    </div>
                    <p className='font-kursive text-[--light] mb-0 mt-4'>Company Reg-No.: FN631285K</p>
                    <p className='font-kursive text-[--light] mb-0'>support@ai-travel-buddy.com</p>
                    <p className='font-kursive text-[--light] mb-0'>+43-676-89807433</p>
                </div>
                <div >
                    <p className='font-kursive mb-6'>Compliance</p>
                    <ul className="flex flex-col gap-1">
                        <Link to={"/site-notice"}><li className='text-[--light] cursor-pointer'>Site Notice</li></Link>
                        {/* <Link to={"/general-terms-and-conditions"}><li className='text-[--light] cursor-pointer'>General Terms and Conditions</li></Link> */}
                        <Link to={"/cookie-policy"}><li className='text-[--light] cursor-pointer'>Cookie Policys</li></Link>
                        <Link to={"/privacy-policy"}><li className='text-[--light] cursor-pointer'>Privacy Policy</li></Link>
                    </ul>
                </div>

                <div>
                    <p className='font-kursive mb-6'>Links</p>
                    <ul className="flex flex-col gap-1">
                        <Link to={"/"}><li className='text-[--light] cursor-pointer'>About AI Travel Buddy</li></Link>
                        <Link to={"/find-destination"}><li className='text-[--light] cursor-pointer'>Find Destination</li></Link>
                        <a href='mailto:support@ai-travel-buddy.com'><li className='text-[--light] cursor-pointer'>Report Problem</li></a>
                        {/* <Link to={"/gtc"}><li className='text-[--light] cursor-pointer'>Customer Support</li></Link> */}
                        {/* <Link to={"/cookie-policy"}><li className='text-[--light] cursor-pointer'>FAQ</li></Link> */}
                    </ul>
                </div>


                {/* Social Media Icons */}
                {/* <div>
                    <p className='font-kursive mb-6'>Social Meida</p>

                    <a href="#">
                        <FontAwesomeIcon icon={faInstagram} size="2x" className='text-[--light]' />
                    </a>
                    <a href="#">
                        <FontAwesomeIcon icon={faFacebook} size="2x" className='ml-4 text-[--light]' />
                    </a>
                    <a href="#">
                        <FontAwesomeIcon icon={faYoutube} size="2x" className='ml-4 text-[--light]' />
                    </a>
                </div> */}

            </div>

            <div className=''>
                <hr className='color-[#F7DB3B]'></hr>
                <p className='mt-5 text-sm text-center text-[--light]'>© Webaffinity e.U. | 2025 all rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
