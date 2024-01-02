'use client'

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useRef, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import { CountrySelectValue } from "../cards/CountryCard";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import qs from "query-string";
import { formatISO } from "date-fns";
import CustomButton from "../buttons/CustomButton";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

const SearchModal = ({ handleClose }: { handleClose: () => void }) => {
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

    const Map = useMemo(() => dynamic(() => import('@/components/Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== 3) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setStep(1);

        handleClose();
        router.push(url);

    }, [step, router, location, bathroomCount, roomCount, guestCount, dateRange, onNext, params, handleClose]);

    const navRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(navRef, () => {
        // setActiveIndex(null);
        handleClose();
    });

    return (
        <div className="fixed flex justify-center items-center inset-0 z-40 bg-[rgba(0,0,0,0.2)]">
            <div className="bg-white rounded p-6 flex flex-col gap-4" ref={navRef}>
                <h1 className="text-lg font-medium min-w-[350px] max-w-md">
                    Add your filters
                </h1>

                <hr />

                <div className="flex flex-col gap-4">

                    {
                        step === 1 &&
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-medium">
                                Where do you want to go?
                            </h1>
                            <CountrySelect
                                value={location}
                                onChange={(value: CountrySelectValue) => {
                                    setLocation(value)
                                }}
                            />
                            <Map
                                center={location?.latlng}
                            />
                        </div>
                    }
                    {
                        step === 2 &&
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-medium">
                                When do you plan to go?
                            </h1>
                            <Calendar
                                value={dateRange}
                                onChange={(value: RangeKeyDict) => setDateRange(value?.selection)}
                            />
                        </div>
                    }
                    {
                        step === 3 &&
                        <div className="flex flex-col gap-4">
                            <h1 className="text-lg font-medium">
                                More Information
                            </h1>
                            <Counter
                                title="Guests"
                                subtitle="How many guest?"
                                value={guestCount}
                                onChange={(value: number) => setGuestCount(value)}
                            />
                            <Counter
                                title="Rooms"
                                subtitle="How many rooms?"
                                value={roomCount}
                                onChange={(value: number) => setRoomCount(value)}
                            />
                            <Counter
                                title="Bathrooms"
                                subtitle="How many bathrooms?"
                                value={bathroomCount}
                                onChange={(value: number) => setBathroomCount(value)}
                            />
                        </div>
                    }

                    <div className={`grid ${step === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                        {
                            step !== 1 &&
                            <CustomButton
                                btnText="Back"
                                onClick={onBack}
                                variant="ghost"
                            />
                        }
                        <CustomButton
                            btnText={step === 3 ? 'Search' : "Next"}
                            onClick={onSubmit}
                            variant="default"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
