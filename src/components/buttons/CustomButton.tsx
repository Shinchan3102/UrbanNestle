'use client'

import { IconType } from "react-icons"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface Props {
    btnText: string
    onClick: (e: any) => void
    variant?: 'default' | 'ghost' | 'destruction' | 'destructionOutline'
    hasIcon?: boolean
    Icon?: IconType
    isVisible?: boolean
    isLoading?: boolean
    iconColor?: string
    disabled?: boolean
    isLarge?: boolean
}

const CustomButton = ({ btnText, onClick, variant = 'default', hasIcon = false, isVisible = false, Icon = AiOutlineLoading3Quarters, isLoading = false, iconColor = '', disabled = false, isLarge = false }: Props) => {
    return (
        <button
            className={`flex w-full items-center gap-2 justify-center py-2 px-4 rounded-md
        ${variant === 'default' && 'bg-black transition hover:bg-black/90 disabled:bg-black/50 text-white hover:shadow-sm'} 
        ${variant === 'destruction' && 'bg-red-500 transition hover:bg-red/80 disabled:bg-red/50 text-white hover:shadow-sm'} 
        ${variant === 'destructionOutline' && 'border-red-500 disabled:border-red-500/50 border-2 transition hover:bg-red-500 disabled:bg-red-500/50 hover:text-white text-red-500 hover:shadow-sm'} 
        ${variant === 'ghost' && 'border text-black transition hover:border-black hover:shadow-sm'}
        ${isLarge && 'py-3'}
        `}
            onClick={onClick}
            disabled={disabled}
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
