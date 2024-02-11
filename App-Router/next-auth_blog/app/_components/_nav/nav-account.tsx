'use server'

import { auth } from "@/auth";
import Avatar from "./avatar-logo";
 

export default async function UserNavComponent() {
    try {
        const session = await auth();
        const username = session?.user?.name; 
        return (
            <div className = "flex h-[48px] grow items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
                    <Avatar />
                    <h1>{username}</h1>
            </div>
         )
    } catch (error) {
        console.error('An error has occurred in UserNav',error);
    }
}