import Logo from '@/components/Logo'
import React from 'react'

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='flex flex-1'>
            <div className='hidden md:block h-full'>

            </div>
            <main className='flex flex-col gap-6 flex-1 justify-center items-center min-h-full'>
                <div className='mx-4'>
                    <Logo
                        height={100}
                        width={250}
                    />
                </div>
                <h1 className='text-lg font-medium text-center mx-4'>
                    Unlock Urban Comfort: Join, Stay, and Explore
                </h1>
                {children}
            </main>
        </div>
    )
}

export default layout
