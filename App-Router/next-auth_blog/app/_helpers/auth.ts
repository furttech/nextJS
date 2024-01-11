import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
//import { sql } from '@vercel/postgres';
import type { User } from "@/app/_lib/definitions";
import bcrypt from 'bcrypt';

async function getUser(email:string): Promise<User | undefined>{
    
    // TODO Update database query to utilize postgres via prisma  
    
    try {
        const user:any = []; //await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return  user.rows[0];
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
      }
}


export const { auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
    Credentials({
        async authorize(credentials){
            const parseCredentials = z
            .object({email: z.string().email(), password: z.string().min(10) })
            .safeParse(credentials);
        
            if(parseCredentials.success){
                const { email, password } = parseCredentials.data;
                const user = await getUser(email);
                if(!user) return null;
                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch) return user;
            }

            console.log('Invalid Creds!');
            return null;
        },
    }),
    ],
    secret: process.env.AUTH_SECRET,
});