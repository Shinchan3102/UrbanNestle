'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { IoCloudUpload } from "react-icons/io5"

declare global {
    var cloudinary: any
}

interface Props {
    onChange: (value: string) => void
    value: string
}

const ImageUpload = ({ value, onChange }: Props) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange])
    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="dk0ssghw"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 transition border p-20 flex flex-col justify-center items-center gap-4 text-neutral-400 border-dashed"
                    >
                        <IoCloudUpload size={50} />
                        <div className="font-semibold text-lg ">
                            Click to upload
                        </div>
                        {
                            value &&
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="upload image"
                                    fill
                                    className="object-cover"
                                    src={value}
                                />
                            </div>
                        }
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload
