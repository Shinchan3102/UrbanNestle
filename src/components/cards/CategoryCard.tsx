import React from 'react'
import { IconType } from 'react-icons'

interface Props {
    Icon: IconType
    label: string
    description: string
    selected?: boolean
    onClick: (value: string) => void
}

const CategoryCard = ({ Icon, label, description, selected = false, onClick }: Props) => {
    return (
        <div onClick={() => onClick(label)} className={`border hover:shadow transition rounded cursor-pointer flex p-3 md:p-4 items-start gap-2 md:gap-4 ${selected ? 'border-2 border-black' : ''}`}>
            <Icon size={40} />
            <div className='flex flex-col gap-0 md:gap-1'>
                <h2 className='font-medium'>
                    {label}
                </h2>
                <div className='line-clamp-1 text-sm text-neutral-400 font-light'>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default CategoryCard
