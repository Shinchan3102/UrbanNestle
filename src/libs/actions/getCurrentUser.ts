import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "../prismadb";

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            }
        });

        if (!currentUser) return null;

        return currentUser;
    } catch (error: any) {
        console.log(error?.message);
    }
}