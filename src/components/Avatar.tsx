import Image from "next/image"
import { FaUserAlt } from "react-icons/fa";


interface Props {
    isUser?: boolean,
    dimension?: number,
    iconUrl?: string,
}

const Avatar = ({ isUser = false, dimension = 25, iconUrl = '/user.png' }: Props) => {
    return (
        <div className='relative text-lg'>
            {
                isUser ?
                    <Image
                        src={iconUrl}
                        alt="user avatar"
                        width={dimension}
                        height={dimension}
                        className="rounded-full"
                    />
                    :
                    <FaUserAlt />
            }
        </div>
    )
}

export default Avatar
