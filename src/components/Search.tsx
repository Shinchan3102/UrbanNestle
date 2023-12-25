'use client'

import { HiOutlineSearch } from "react-icons/hi";


const Search = () => {
    return (
        <div className='border-[0.5px] text-sm sm:min-w-[200px] w-full justify-between md:justify-start md:w-auto py-2 px-1 rounded-full shadow-sm transition cursor-pointer hover:shadow-md flex items-center'>
            <div className="px-2">
                Anywhere
            </div>
            <div className="px-2 border-x-[1px] hidden md:block">
                Any Week
            </div>
            <div className="px-2 flex items-center gap-2">
                <div className="hidden md:block">
                    Add Guests
                </div>
                <div className="rounded-full bg-black text-white p-1.5 text-base">
                    <HiOutlineSearch />
                </div>
            </div>
        </div>
    )
}

export default Search
