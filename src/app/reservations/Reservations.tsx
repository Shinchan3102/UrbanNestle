'use client'

import ListingCard from "@/components/cards/ListingCard"
import Heading from "@/components/headings/Heading"
import { Listing, Reservation, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

interface Props {
    currentUser: User,
    reservations: (Reservation & {
        listing: Listing
    })[]
}

const Reservations = ({ currentUser, reservations }: Props) => {

    const router = useRouter();

    const [deleteId, setDeleteId] = useState<string>('');

    const onCancel = useCallback(async (id: string) => {
        setDeleteId(id);

        try {
            const res = await axios.delete(`/api/reservations/${id}`);

            if (res.status === 200) {
                toast.success(`Reservation cancelled successfully`);
                router.refresh();
            }
        } catch (error: any) {
            console.log(error);
            toast.error(`unable to cancel your trip, please try again!`)
        } finally {
            setDeleteId('');
        }
    }, [router]);

    return (
        <div className="flex flex-col gap-6">
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties!"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {
                    reservations.map((item) => (
                        <ListingCard
                            key={item.id}
                            data={item.listing}
                            actionId={item.id}
                            onAction={onCancel}
                            disabled={deleteId === item.id}
                            actionLabel="Cancel reservation"
                            currentUser={currentUser}
                            reservation={item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Reservations