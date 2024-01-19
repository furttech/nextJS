'use server'

import { auth } from "@/auth";

export default async function UserNavComponent() {
    try {
        const session = await auth();
        const username = session?.user?.name; 
        return (
            <div>
                <h1>{username}</h1>
            </div>
         )
    } catch (error) {
        console.error('An error has occurred in UserNav',error);
    }
}