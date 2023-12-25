import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    width?: number,
    height?: number
}

const Logo = ({ width = 160, height = 50 }: Props) => {
    return (
        <Link
            href={'/'}
            className='relative'
        >
            <Image
                src={'/logo_black.png'}
                className='object-contain'
                width={width}
                height={height}
                alt='urban nestle logo'
            />
        </Link>
    )
}

export default Logo
