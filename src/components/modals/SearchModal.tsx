'use client'

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react";
import { Range } from "react-date-range";
import { CountrySelectValue } from "../cards/CountryCard";

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();

    const [step, setStep] = useState<number>(1);
    const [guestCount, setGuestCount] = useState<number>(1);
    const [roomCount, setRoomCount] = useState<number>(1);
    const [bathroomCount, setBathroomCount] = useState<number>(1);
    const [location, setLocation] = useState<CountrySelectValue>()
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(), endDate: new Date(), key: 'selection'
    });

    // const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
    //     ssr: false
    // }), [location]);
    
    return (
        <div>

        </div>
    )
}

export default SearchModal
