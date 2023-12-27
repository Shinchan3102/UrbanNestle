import { getCurrentUser } from "@/libs/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return NextResponse.error();

        const body = await req.json();

        const { title, description, imageSrc, category, roomCount, guestCount, bathroomCount, price, location } = body;

        Object.keys(body).forEach((value: any) => {
            if (!body[value]) return NextResponse.error();
        });

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                roomCount: parseInt(roomCount, 10),
                bathroomCount: parseInt(bathroomCount, 10),
                guestCount: parseInt(guestCount, 10),
                locationValue: location?.value,
                price: parseInt(price, 10),
                userId: currentUser?.id,
                category
            }
        });

        return NextResponse.json(listing);
    } catch (error) {
        console.log(error);
    }
}