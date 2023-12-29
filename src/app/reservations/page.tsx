import Empty from '@/components/Empty';
import { getCurrentUser } from '@/libs/actions/getCurrentUser';
import { getReservations } from '@/libs/actions/reservations-actions';
import React from 'react'
import Reservations from './Reservations';

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

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations?.length === 0) return (
        <div className='container flex-1 flex flex-col mx-auto'>
            <Empty
                title='No Reservations found'
                subtitle="Looks like you haven't reserved any trips on your property"
            />
        </div>
    )
  return (
    <div className='container mx-auto flex-1 py-6 px-6 md:px-0'>
            <Reservations
                reservations={reservations || []}
                currentUser={currentUser}
            />
        </div>
  )
}

export default page
