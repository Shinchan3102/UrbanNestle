'use client'

import { LuMenu } from "react-icons/lu";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";


const UserMenu = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className='relative'>
            <div className='flex flex-row gap-3 items-center'>
                <div className='hidden font-medium md:block text-sm px-4 py-2 rounded-full hover:bg-neutral-100  transition cursor-pointer'>
                    UrbanNestle your home
                </div>
                <div className='flex flex-row gap-2 border-[1px] border-neutral-200 transition rounded-full p-1 items-center cursor-pointer'>
                    <div className="rounded-full hover:bg-neutral-100 p-1.5" onClick={handleToggleOpen}>
                        <LuMenu />
                    </div>
                    <div className="p-1.5 pl-0 hidden md:block">
                        <Avatar />
                    </div>
                </div>

            </div>
            {
                isOpen &&
                <div className="absolute rounded-md w-[200px] shadow-md bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        <MenuItem
                            redirectTo="/"
                            label="Login"
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenu
