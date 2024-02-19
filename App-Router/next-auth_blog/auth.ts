import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from 'bcrypt';
import { fetchUserByEmail, setLocalUserSession } from "./app/_actions/userActions";
import GitHub from "next-auth/providers/github";

export const {  auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials){

                const parseCredentials = z
                .object({email: z.string().email(), password: z.string().min(10) })
                .parse(credentials);

                if(parseCredentials){
                    
                    const password = parseCredentials.password;
                    const user = await fetchUserByEmail(parseCredentials.email);
                    if(!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password!);
                    if(passwordMatch){
                        setLocalUserSession(user.id);
                        return user;
                    } 
                    
                }

                console.log(`Invalid Creds!`);
                return null;
            },
        }),
        GitHub
    ],

    secret: process.env.AUTH_SECRET,
});