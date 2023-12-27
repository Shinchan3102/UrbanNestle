import Logo from '../Logo'
import Search from '../Search'
import UserMenu from '../UserMenu'
import { User } from '@prisma/client'

interface Props {
    currentUser?: User | null;
}

const Navbar = ({ currentUser }: Props) => {
    // console.log(currentUser);
    return (
        <div className='fixed w-full bg-white z-20 shadow-sm border-b-[0.5px]'>
            <div className='main-container mx-auto py-4 flex flex-row items-center justify-between gap-4'>
                <div className='hidden sm:block'>
                    <Logo />
                </div>
                <Search />
                <UserMenu currentUser={currentUser} />
            </div>
        </div>
    )
}

export default Navbar
