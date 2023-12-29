'use client'

import Heading from '@/components/headings/Heading'
import { categories } from '@/utils/constants'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingInfo from './ListingInfo'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from './ListingReservation'
import { DateRange, Range } from 'react-date-range'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface Props {
    reservations?: Reservation[]
    listing: Listing & {
        user: User
    }
    currentUser?: User | null
}

const ListingClient = ({ listing, currentUser, reservations = [] }: Props) => {
    const router = useRouter();

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) return router.push('/sign-in');
        setIsLoading(true);
        try {
            const res = await axios.post('/api/reservations', {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                totalPrice,
                listingId: listing?.id
            });
            if (res.status === 200) {
                toast.success('Successfully booked your reservation!');
                router.push('/trips');
            }
        } catch (error: any) {
            console.log(error);
            toast.error(`Unable to book your reservations due to some issue ${error?.message}`)
        } finally {
            setIsLoading(false);
        }


    }, [totalPrice, dateRange, listing?.id, router, currentUser]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

    return (
        <div className='flex-1 flex flex-col gap-6'>
            <Heading
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                id={listing.id}
                currentUser={currentUser}
            />

            <div className='grid grid-col-1 md:grid-cols-8 gap-6'>
                <ListingInfo
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                />
                <ListingReservation
                    price={listing.price}
                    totalPrice={totalPrice}
                    onChangeDate={(value: Range) => setDateRange(value)}
                    dateRange={dateRange}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledDates={disabledDates}
                />
            </div>
        </div>
    )
}

export default ListingClient
