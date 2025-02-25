import React from 'react'

const Itineraries = () => {
    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-0 pt-5'>
            <h2 className='mt-10 text-4xl md:text-5xl mb-4'>Itineraries</h2>
            <p className='text-[--light] mb-4'>Search presets of awesome itineraries</p>
            <div className='p-2 rounded-lg dark:bg-transparent bg-gray-100 relative'>
                <div className='flex flex-row gap-2'>
                    <div className='w-full bg-gray-200 dark:bg-[#060e22] rounded h-[100px]'></div>
                    <div className='w-full bg-gray-200 dark:bg-[#060e22] rounded  h-[100px]'></div>
                    <div className='w-full bg-gray-200 dark:bg-[#060e22] rounded  h-[100px]'></div>
                    <div className='w-full bg-gray-200 dark:bg-[#060e22] rounded  h-[100px]'></div>
                </div>
                <div className="absolute rounded-lg inset-0 dark:bg-black/50 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <h2 className="text-2xl text-[--light]">Coming Soon</h2>
                </div>
            </div>
        </div>
    )
}

export default Itineraries
