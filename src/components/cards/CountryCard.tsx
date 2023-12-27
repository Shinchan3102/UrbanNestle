import React from 'react'
import { IconType } from 'react-icons'

export type CountrySelectValue = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
}

interface Props {
    value: CountrySelectValue
    onClick: (value: CountrySelectValue) => void
    selected: boolean
}

const CountryCard = ({ value, selected=false, onClick }: Props) => {
    return (
        <div onClick={() => onClick(value)} className={`border hover:shadow transition rounded cursor-pointer flex p-3 md:p-4 items-start gap-2 md:gap-4 ${selected ? 'border-2 border-black' : ''}`}>
            <div className=''>
                {value?.flag}
            </div>
            <div className='flex-1 flex flex-col gap-0 md:gap-1'>
                <h2 className='font-medium line-clamp-1'>
                    {value.label}
                </h2>
                <div className='line-clamp-1 text-sm text-neutral-400 font-light'>
                    {value.region}
                </div>
            </div>
        </div>
    )
}

export default CountryCard