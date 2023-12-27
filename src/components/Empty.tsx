'use client'

import { useRouter } from "next/navigation"
import CustomButton from "./buttons/CustomButton"

interface Props {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const Empty = ({ title = 'No exact matches', subtitle = 'Try changing filters or choose other category', showReset = false }: Props) => {
    const router = useRouter();

    return (
        <div className="flex flex-col flex-1 gap-2 justify-center items-center">
            <h1 className="font-medium text-xl">
                {title}
            </h1>
            <h3 className="text-neutral-500 text-sm">
                {subtitle}
            </h3>
            {
                showReset &&
                    <div className="">
                        <CustomButton
                            variant="ghost"
                            btnText="Remove all filters"
                            onClick={() => { router.push('/') }}
                        />
                    </div>
            }
        </div>
    )
}

export default Empty
