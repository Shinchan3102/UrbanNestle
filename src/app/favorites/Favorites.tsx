'use client'

import ListingCard from "@/components/cards/ListingCard"
import Heading from "@/components/headings/Heading"
import { Listing, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

interface Props {
    currentUser: User,
    favorites: Listing[]
}

const Favorites = ({ currentUser, favorites }: Props) => {

    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <Heading
                title="My Favorites"
                subtitle="List of places which you liked!"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {
                    favorites.map((item) => (
                        <ListingCard
                            key={item.id}
                            data={item}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites