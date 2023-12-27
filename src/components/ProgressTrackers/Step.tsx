import { IconType } from "react-icons"

interface Props {
    Icon: IconType
    label: string
    status?: 'COMPLETED' | 'ACTIVE' | 'INCOMPLETE'
    id: number
}

const Step = ({ Icon, label, status = 'INCOMPLETE', id }: Props) => {
    return (
        <div className="relative flex flex-col items-center  gap-2 pb-2">
            <div className={`rounded-full md:text-sm text-xs w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border ${status === 'INCOMPLETE' ? 'text-neutral-400 bg-white' : status === 'ACTIVE' ? 'border-black text-black bg-white' : 'bg-black text-white border-black'}`}>
                {id}
            </div>
            <div className={`flex items-center gap-1 z-10 text-sm rounded-full w-6 h-6 md:w-fit md:h-fit border md:border-none justify-center ${status === 'INCOMPLETE' ? 'text-neutral-400 bg-white' : status === 'ACTIVE' ? 'text-black' : ''} md:rounded-none absolute top-full`}>
                <Icon />
                <div className="md:block hidden text-xs font-medium">
                    {label}
                </div>
            </div>
        </div>
    )
}

export default Step
