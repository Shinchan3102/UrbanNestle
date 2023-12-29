import Empty from '@/components/Empty';
import { getListingById } from '@/libs/actions/listings-actions'
import React from 'react'
import ListingClient from './ListingClient';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';
import { getReservations } from '@/libs/actions/reservations-actions';

interface IParams {
    listingId?: string | undefined
}

const page = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    return (
        <div className='container mx-auto flex flex-1 flex-col py-8 px-4 md:px-0'>
            {
                !listing ?
                    <Empty
                    />
                    :
                    <>
                        <ListingClient
                            currentUser={currentUser}
                            listing={listing}
                            reservations={reservations}
                        />
                    </>
            }
        </div>
    )
}

export default page
