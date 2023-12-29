import { getCurrentUser } from "@/libs/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();

        console.log('user reservation')

        if (!currentUser) return NextResponse.error();

        const body = await req.json();

        const { listingId, startDate, endDate, totalPrice } = body;

        if (!listingId || !startDate || !endDate || !totalPrice) return NextResponse.error();

        const listingwithReservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
                reservations: {
                    create: {
                        userId: currentUser.id,
                        startDate,
                        endDate,
                        totalPrice
                    }
                }
            }
        });

        return NextResponse.json(listingwithReservation);

    } catch (error: any) {
        console.log(error);
        // throw new Error(`Something went wrong ${error?.message}`)
    }
}