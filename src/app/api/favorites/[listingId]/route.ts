import { getCurrentUser } from "@/libs/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
    listingId?: string
}

export async function POST(req: Request, { params }: { params: Params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return NextResponse.error();

        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid id');
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];


        favoriteIds.push(listingId)

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });


        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error?.message);
        // throw new Error(`Error in update like ${error?.message}`)
    }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return NextResponse.error();

        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid id');
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];

        favoriteIds = favoriteIds.filter((id) => id !== listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });


        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error?.message);
        // throw new Error(`Error in update like ${error?.message}`)
    }
}