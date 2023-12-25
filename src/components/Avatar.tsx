import Image from "next/image"
import { FaUserAlt } from "react-icons/fa";


interface Props {
    isUser?: boolean,
    dimension?: number,
    iconUrl?: string,
}

const Avatar = ({ isUser = false, dimension = 30, iconUrl = '' }: Props) => {
    return (
        <div className='relative text-lg'>
            {
                isUser ?
                    <Image
                        src={iconUrl}
                        alt="user avatar"
                        width={dimension}
                        height={dimension}
                    />
                    :
                    <FaUserAlt />
            }
        </div>
    )
}

export default Avatar
