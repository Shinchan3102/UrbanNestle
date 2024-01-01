
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "./libs/prismadb";
import * as z from "zod";

import bcrypt from 'bcryptjs'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export default {
    providers: [Credentials({
        async authorize(credentials) {
           
            const validatedFields = LoginSchema.safeParse(credentials);
      
            if (validatedFields.success) {
                const { email, password } = validatedFields.data;
        
                if (!email || !password) {
                    throw new Error('Invalid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid Credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.hashedPassword
                )
                if (!isCorrectPassword) {
                    throw new Error('Invalid Credentials');
                }

                return user;
            }
            return null;
        }
    })],
} satisfies NextAuthConfig