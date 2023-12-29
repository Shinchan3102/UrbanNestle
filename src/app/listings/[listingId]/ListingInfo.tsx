import Avatar from '@/components/Avatar'
import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import React from 'react'
import { IconType } from 'react-icons'

interface Props {
    user: User
    description: string
    roomCount: number
    guestCount: number
    bathroomCount: number
    category: {
        icons: IconType
        label: string
        description: string
    } | undefined
    locationValue: string
}

const Map = dynamic(() => import('@/components/Map'), {
    ssr: false
})

const ListingInfo = ({ user, description, roomCount, guestCount, category, locationValue, bathroomCount }: Props) => {

    const { getByValue } = useCountries();

    const Icon = category?.icons;

    const coordinates = getByValue(locationValue)?.latlng;
    return (
        <div className='flex flex-col gap-6 w-full md:col-span-5'>

            {/* general info  */}
            <div className='flex flex-col md:flex-row justify-between gap-4'>
                {/* user info and counts section  */}
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-4 items-center'>
                        <h2 className='font-medium text-lg'>
                            Hosted by {user.name}
                        </h2>
                        <Avatar
                            isUser
                            iconUrl={user.image || '/user.png'}
                        />
                    </div>

                    <div className='text-sm text-neutral-500'>
                        {guestCount} Guests | {roomCount} Rooms | {bathroomCount} Bathrooms
                    </div>
                </div>

                {/* category section  */}
                <div className='flex items-center gap-3'>
                    {Icon && <Icon size={30} />}
                    <div className='font-medium'>
                        {category?.label}
                    </div>
                </div>

            </div>
            <hr />

            {/* more info and map section  */}
            <div className='flex flex-col gap-6'>

                {/* description section  */}
                <div className='flex flex-col gap-4'>
                    <h2 className='text-lg font-medium'>
                        Description
                    </h2>
                    <div className='text-sm'>
                        {description}
                    </div>
                </div>

                {/* map section  */}
                <Map
                    center={coordinates}
                />
            </div>
        </div>
    )
}

export default ListingInfo
