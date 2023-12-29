import prisma from "../prismadb";
import { getCurrentUser } from "./getCurrentUser";

export interface IListingParams {
    userId?: string
}

export async function getListings(params: IListingParams) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings;
    } catch (error: any) {
        console.log(`something went wrong ${error?.message}`);
        // throw new Error(error);
    }
}


export async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return [];

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds) || []]
                }
            }
        });

        return favorites;
    } catch (error: any) {
        console.log(`something went wrong ${error?.message}`);
        // throw new Error(error);
    }
}

export const getListingById = async ({ listingId }: { listingId?: string }) => {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) return null;

        return listing;

    } catch (error: any) {
        console.log(`something went wrong ${error?.message}`);
        // throw new Error(error);
    }
}