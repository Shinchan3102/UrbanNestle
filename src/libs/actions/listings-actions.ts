import prisma from "../prismadb";
import { getCurrentUser } from "./getCurrentUser";

export interface IListingParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string
}

export async function getListings(params: IListingParams) {
    try {
        const { userId, roomCount, guestCount, category, bathroomCount, endDate, locationValue, startDate } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            };
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                endDate: { gte: endDate },
                                startDate: { lte: endDate }
                            },
                        ]
                    }
                }
            };
        }
        if (locationValue) {
            query.locationValue = locationValue;
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