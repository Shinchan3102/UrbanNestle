'use client'

import { IconType } from "react-icons"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface Props {
    btnText: string
    onClick: () => void
    variant?: 'default' | 'ghost'
    hasIcon?: boolean
    Icon?: IconType
    isVisible?: boolean
    isLoading?: boolean
    iconColor?: string
}

const CustomButton = ({ btnText, onClick, variant = 'default', hasIcon = false, isVisible = false, Icon = AiOutlineLoading3Quarters, isLoading = false, iconColor='' }: Props) => {
    return (
        <button
            className={`flex w-full items-center gap-2 justify-center py-2 px-4 rounded-md
        ${variant === 'default' && 'bg-black hover:bg-black/90 text-white'} 
        ${variant === 'ghost' && 'border text-black transition hover:border-black'}
        `}
            onClick={onClick}
        >
            {
                isVisible && hasIcon &&
                <span className={`text-base ${iconColor} ${isLoading && 'animate-spin'} ${variant === 'default' && 'text-white'} ${variant === 'ghost' && 'text-black'}`}>
                    <Icon />
                </span>
            }
            <span>
                {btnText}
            </span>
        </button>
    )
}

export default CustomButton
