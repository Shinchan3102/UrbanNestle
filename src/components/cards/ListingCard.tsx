'use client'

import useCountries from "@/hooks/useCountries"
import { Listing, Reservation, User } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import React, { useCallback, useMemo } from "react"
import LikeButton from "../buttons/LikeButton"
import CustomButton from "../buttons/CustomButton"
import { useRouter } from "next/navigation"

interface Props {
    data: Listing
    reservation?: Reservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: User | null
}

const ListingCard = ({ data, reservation, onAction, actionId = '', actionLabel, currentUser, disabled }: Props) => {
    const router = useRouter();

    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) return null;

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);

    return (
        <div
            onClick={() => { router.push(`/listings/${data.id}`) }}
            className="group flex flex-col relative cursor-pointer"
        >
            <div className="aspect-square w-full relative z-0 overflow-hidden rounded-xl">
                <Image
                    src={data.imageSrc}
                    alt={data.title}
                    fill
                    className="object-cover transition group-hover:scale-110"
                />

                {
                    !reservation &&
                    <div className="absolute z-10 top-2 right-2">
                        <LikeButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                }
            </div>
            <h2 className="font-medium text-lg">
                {location?.region}, {location?.label}
            </h2>
            <h4 className="text-sm text-neutral-500">
                {reservationDate || data.category}
            </h4>
            <div className="flex items-center gap-1 text-sm mb-3">
                <div className="font-medium">
                    $ {price}
                </div>
                {
                    !reservation && (
                        <div className="">
                            per night
                        </div>
                    )
                }
            </div>
            {
                onAction && actionLabel && (
                    <CustomButton
                        disabled={disabled}
                        variant="destructionOutline"
                        onClick={handleCancel}
                        btnText={actionLabel}
                        isLoading={disabled}
                        isVisible={disabled}
                        hasIcon
                    />
                )
            }
        </div>
    )
}

export default ListingCard
