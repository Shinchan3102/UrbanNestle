'use client'

import { IconType } from "react-icons";
import { IoMailOutline } from "react-icons/io5";


interface Props {
    id: string
    label: string
    value: string | number
    type?: string
    disabled?: boolean
    hasIcon?: boolean,
    onChange: (value: (string | number), name: string) => void
    Icon?: IconType
}

const Input2 = ({ label, type = "text", disabled = false, id, hasIcon = false, Icon = IoMailOutline, value, onChange }: Props) => {
    return (
        <div className="w-full relative flex items-center">

            <input
                disabled={disabled}
                placeholder=""
                type={type}
                value={value}
                id={id}
                name={id}
                onChange={(e) => onChange(e.target.value, e.target.name)}
                className={`peer w-full text-sm border rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed p-3 ${hasIcon ? 'pl-8' : 'pl-2'} border-neutral-300 focus:border-black`}
            />
            <label htmlFor={id} className={`absolute duration-150 transform -translate-y-5 scale-75 bg-white top-2.5 z-10 peer-placeholder-shown:scale-100 ${hasIcon ? '-translate-x-5' : '-translate-x-3'} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${hasIcon ? 'peer-focus:-translate-x-5' : 'peer-focus:-translate-x-3'} px-2 text-zinc-300 peer-focus:text-black ${hasIcon ? 'left-6' : 'left-2'}`}>
                {label}
            </label>
            {
                hasIcon &&
                <div className={`absolute z-10 left-2 origin-[0] text-zinc-300 peer-focus:text-black`}>
                    <Icon />
                </div>
            }
        </div>
    )
}

export default Input2