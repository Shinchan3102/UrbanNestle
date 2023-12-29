'use client'

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"

interface Props {
    listingId: string
    currentUser?: User | null
}

const useFavorite = ({ listingId, currentUser }: Props) => {
    const router = useRouter();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async () => {
        // e.stopPropagation();

        if (!currentUser) return router.push('/sign-in');

        try {
            let req;
            let msg = '';
            if (hasFavorited) {
                req = () => axios.delete(`/api/favorites/${listingId}`);
                msg = 'Successfully removed from your liked lists';
            } else {
                req = () => axios.post(`/api/favorites/${listingId}`);
                msg = 'Successfully added to your liked lists';
            }

            await req();

            router.refresh();
            toast.success(msg);
        } catch (error: any) {
            console.log(error);
            toast.error(`Failed to updated your liked lists ${error?.message}`)
        }
    }, [currentUser, hasFavorited, listingId, router]);

    return { hasFavorited, toggleFavorite }
}

export default useFavorite;