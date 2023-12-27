'use client'

import { LuMenu } from "react-icons/lu";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { User } from "@prisma/client";
import Link from "next/link";
import { menuItems } from "@/utils/constants";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    currentUser?: User | null;
}


const UserMenu = ({ currentUser }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleToggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return router.push('/sign-in');
        }

        return router.push('/rent');

    }, [currentUser]);

    return (
        <div className='relative'>
            <div className='flex flex-row gap-3 items-center'>
                <div onClick={onRent} className='hidden font-medium md:block text-sm px-4 py-2 rounded-full hover:bg-neutral-100  transition cursor-pointer'>
                    UrbanNestle your home
                </div>
                <div className='flex flex-row border-[1px] border-neutral-200 transition rounded-full p-1 py-0.5 items-center cursor-pointer'>
                    {
                        currentUser ?
                            <>
                                <div className="rounded-full hover:bg-neutral-100 p-1.5 py-1" onClick={handleToggleOpen}>
                                    <LuMenu />
                                </div>
                                <div className="p-1.5 py-1 pl-0 hidden md:block" onClick={handleToggleOpen}>
                                    <Avatar
                                        isUser={true}
                                        iconUrl={currentUser?.image || '/user.png'}
                                    />
                                </div>
                            </>
                            :
                            <Link
                                href={'/sign-in'}
                                className="rounded-full hover:bg-neutral-100 p-1.5"
                            >
                                <Avatar />
                            </Link>
                    }
                </div>

            </div>
            {
                isOpen &&
                <div className="absolute z-20 rounded-md min-w-[200px] shadow-md bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {
                            menuItems.map((item) => (
                                <MenuItem
                                    redirectTo={item.redirectTo}
                                    label={item.name}
                                    key={item.redirectTo}
                                />
                            ))
                        }
                        <div className="p-2 px-4 hover:bg-neutral-100 transition" onClick={onRent}>
                            UrbanNestle your home
                        </div>
                        <hr />
                        <div className="p-2 px-4 hover:bg-red-500 transition hover:text-white" onClick={() => signOut()}>
                            Logout
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserMenu
