'use client'

import useFavorite from "@/hooks/useFavorite"
import { User } from "@prisma/client"
import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface Props {
    listingId: string
    currentUser?: User | null
}

const LikeButton = ({ listingId, currentUser }: Props) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    });

    return (
        <div onClick={(e:React.MouseEvent<HTMLDivElement>)=>{e.stopPropagation();toggleFavorite()}} className="relative hover:opacity-80 transition cursor-pointer">
            <AiFillHeart size={28} className={` ${hasFavorited ? 'fill-red-500' : 'fill-white'}`} />
        </div>
    )
}

export default LikeButton
