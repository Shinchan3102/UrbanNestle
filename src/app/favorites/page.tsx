import Empty from '@/components/Empty';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';
import { getFavoriteListings } from '@/libs/actions/listings-actions';
import React from 'react'
import Favorites from './Favorites';

const page =async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) return (
        <div className='container flex-1 flex flex-col mx-auto'>
            <Empty
                title='Unauthorised'
                subtitle='Please Login'
            />
        </div>
    )

    const favorites = await getFavoriteListings();

    if (favorites?.length === 0) return (
        <div className='container flex-1 flex flex-col mx-auto'>
            <Empty
                title='No favorites found'
                subtitle="Looks like you haven't favorites on your account"
            />
        </div>
    )
  return (
    <div className='container mx-auto flex-1 py-6 px-6 md:px-0'>
            <Favorites
                favorites={favorites || []}
                currentUser={currentUser}
            />
        </div>
  )
}

export default page
