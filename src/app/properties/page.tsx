import Empty from '@/components/Empty';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';
import { getFavoriteListings, getListings } from '@/libs/actions/listings-actions';
import React from 'react'
import Properties from './Properties';

const page = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <div className='container flex-1 flex flex-col mx-auto'>
            <Empty
                title='Unauthorised'
                subtitle='Please Login'
            />
        </div>
    )

    const listings = await getListings({ userId: currentUser.id });

    if (listings?.length === 0) return (
        <div className='container flex-1 flex flex-col mx-auto'>
            <Empty
                title='No listings found'
                subtitle="Looks like you haven't properties on your account"
            />
        </div>
    )
    return (
        <div className='container mx-auto flex-1 py-6 px-6 md:px-0'>
            <Properties
                listings={listings || []}
                currentUser={currentUser}
            />
        </div>
    )
}

export default page
