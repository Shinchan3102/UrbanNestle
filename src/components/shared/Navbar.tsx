import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import UserMenu from '../UserMenu'

const Navbar = () => {
    return (
        <div className='fixed w-full bg-white z-10 shadow-sm border-b-[0.5px]'>
            <div className='main-container mx-auto py-4 flex flex-row items-center justify-between gap-4'>
                <div className='hidden sm:block'>
                    <Logo />
                </div>
                <Search />
                <UserMenu />
            </div>
        </div>
    )
}

export default Navbar
