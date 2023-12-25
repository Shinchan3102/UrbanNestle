'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons";
import { BiDollar } from 'react-icons/bi';
import { IoMailOutline } from "react-icons/io5";


interface Props {
    id: string
    label: string
    type?: string
    disabled?: boolean
    required?: boolean
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    hasIcon?: boolean,
    Icon?: IconType
}

const Input = ({ label, type = "text", disabled = false, required, register, errors, id, hasIcon = false, Icon = IoMailOutline }: Props) => {
    return (
        <div className="w-full relative flex items-center">

            <input
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className={`peer w-full text-sm border rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed p-3 ${hasIcon ? 'pl-8' : 'pl-2'} ${errors[id] ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-black'}`}
            />
            <label htmlFor={id} className={`absolute duration-150 transform -translate-y-5 scale-75 bg-white top-2.5 z-10 peer-placeholder-shown:scale-100 -translate-x-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:-translate-x-5 px-2 ${errors[id] ? 'text-red-500' : 'text-zinc-300 peer-focus:text-black'} ${hasIcon ? 'left-6' : 'left-2'}`}>
                {label}
            </label>
            {
                hasIcon &&
                <div className={`absolute z-10 left-2 origin-[0] ${errors[id] ? 'text-red-500' : 'text-zinc-300 peer-focus:text-black'}`}>
                    <Icon />
                </div>
            }
        </div>
    )
}

export default Input
