'use client'

import { categories } from '@/utils/constants'
import React from 'react'
import CategoryIconCard from './cards/CategoryIconCard'
import { useSearchParams } from 'next/navigation'

const Categories = () => {
    const params = useSearchParams();
    const activeCategory = params?.get('category');

    return (
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto border-b'>
            {
                categories.map((item) => (
                    <CategoryIconCard
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        selected={activeCategory === item.label}
                        Icon={item.icons}
                    />
                ))
            }
        </div>
    )
}

export default Categories
