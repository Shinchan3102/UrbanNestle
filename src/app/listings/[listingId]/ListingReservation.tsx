'use client'

import CustomButton from "@/components/buttons/CustomButton"
import Calendar from "@/components/inputs/Calendar"
import { Range, RangeKeyDict } from "react-date-range"

interface Props {
    price: number
    totalPrice: number
    dateRange: Range
    onChangeDate: (value: Range) => void
    onSubmit: () => void
    disabled?: boolean
    disabledDates: Date[]
}

const ListingReservation = ({ price, totalPrice, dateRange, onChangeDate, onSubmit, disabledDates, disabled }: Props) => {
    return (
        <div className="rounded-xl border border-neutral-200 h-fit overflow-hidden md:col-span-3">
            <div className="p-4">
                <h2 className="text-xl font-medium">
                    $ {price} <span className="text-base font-light text-neutral-600">per night</span>
                </h2>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value: RangeKeyDict) => onChangeDate(value?.selection)}
            />
            <hr />
            <div className="p-4 justify-between flex items-center gap-4">
                <h2 className="text-lg font-medium">
                    Total
                </h2>
                <div className="font-medium">
                    $ {totalPrice}
                </div>
            </div>

            <div className="m-3 mb-4">
                <CustomButton
                    btnText="Reserve"
                    disabled={disabled}
                    onClick={onSubmit}
                    isLarge
                    hasIcon
                    isVisible={disabled}
                    isLoading
                />
            </div>
        </div>
    )
}

export default ListingReservation
