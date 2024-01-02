'use client'

import { useOnClickOutside } from "@/hooks/useClickOutside";
import { useMemo, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import SearchModal from "./modals/SearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { differenceInDays } from "date-fns";


const Search = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }

        return 'Anywhere';
    }, [startDate, endDate])


    const durationLabel = useMemo(() => {
        if (guestCount) {

            return `${guestCount} Guests`;
        }

        return 'Add Guests';
    }, [guestCount])


    const guestLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
            if (diff == 0) diff = 1;

            return `${diff} Days`;
        }

        return 'Any week';
    }, [getByValue, locationValue])


    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div onClick={handleOpen} className='border-[0.5px] text-sm sm:min-w-[200px] w-full justify-between md:justify-start md:w-auto py-2 px-1 rounded-full shadow-sm transition cursor-pointer hover:shadow-md flex items-center'>
            <div className="px-2">
                {locationLabel}
            </div>
            <div className="px-2 border-x-[1px] hidden md:block">
                {durationLabel}
            </div>
            <div className="px-2 flex items-center gap-2">
                <div className="hidden md:block">
                    {guestLabel}
                </div>
                <div className="rounded-full bg-black text-white p-1.5 text-base">
                    <HiOutlineSearch />
                </div>
            </div>

            {
                isOpen &&
                <SearchModal
                    handleClose={handleClose}
                />
            }
        </div>
    )
}

export default Search
