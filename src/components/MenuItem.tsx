import Link from "next/link"

interface Props {
    redirectTo: string
    label: string
}

const MenuItem = ({ label, redirectTo }: Props) => {
    return (
        <Link href={redirectTo} className="hover:bg-neutral-100 py-2 px-4 transition">
            {label}
        </Link>
    )
}

export default MenuItem
