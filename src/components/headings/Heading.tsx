'use client'

import useCountries from '@/hooks/useCountries'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import LikeButton from '../buttons/LikeButton'

interface Props {
    title: string
    subtitle?: string
    imageSrc?: string | null
    locationValue?: string | null
    id?: string
    currentUser?: User | null
}

const Heading = ({ title, imageSrc, locationValue, id='', currentUser, subtitle }: Props) => {

    const { getByValue } = useCountries();

    const location = (locationValue && getByValue(locationValue));

    return (
        <>
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-semibold'>
                    {title}
                </h1>
                <h3 className='text-lg text-neutral-400'>
                    {
                        subtitle ?
                            subtitle
                            :
                            location && `${location?.region}, ${location?.label}`
                    }
                </h3>
            </div>
            {
                imageSrc &&
                <div className='w-full h-[40vh] md:h-[60vh] relative rounded-xl overflow-hidden'>
                    <Image
                        src={imageSrc}
                        alt={title}
                        className='object-cover w-full'
                        fill
                    />
                    <div className='absolute z-10 top-4 right-4'>
                        <LikeButton
                            listingId={id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default Heading
