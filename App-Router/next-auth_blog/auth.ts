import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from 'bcrypt';
import { getUser } from "./app/_helpers/actions";
import GitHub from "next-auth/providers/github";

export const { handlers: {GET,POST}, auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
    Credentials({
        async authorize(credentials){
            const parseCredentials = z
            .object({email: z.string().email(), password: z.string().min(10) })
            .parse(credentials);

            if(parseCredentials){
                
                const password = parseCredentials.password;
                const user = await getUser(parseCredentials.email);
                if(!user) return null;

                const passwordMatch = await bcrypt.compare(password, user.password!);
                if(passwordMatch) return user;
                
            }

            console.log(`Invalid Creds! `);
            return null;
        },
    }),
    GitHub
    ],

    secret: process.env.AUTH_SECRET,
});