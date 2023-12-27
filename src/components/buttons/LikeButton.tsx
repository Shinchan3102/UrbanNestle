'use client'

import { User } from "@prisma/client"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface Props {
    listingId: string
    currentUser?: User | null
}

const LikeButton = ({ listingId, currentUser }: Props) => {
    const hasLiked = true;

    const toggleLike = () => {

    }
    return (
        <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
            <AiFillHeart size={28} className={` ${hasLiked ? 'fill-red-500' : 'fill-white'}`} />
        </div>
    )
}

export default LikeButton
