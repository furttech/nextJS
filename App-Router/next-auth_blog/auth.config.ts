import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }){
            const isLoggedIn = !!auth?.user;
            const isOnFeed = nextUrl.pathname.startsWith('/blog');
            
            if(isOnFeed){

                /* Furts lazy being old and obnoxious way
                    //if(isLoggedIn) return true;
                    //return false;
                */

                // The better Way :)
                return isLoggedIn;

            } else if (isLoggedIn){
                return Response.redirect(new URL('/blog', nextUrl));
            }
            return true;
        }
    },
    providers: []
} satisfies NextAuthConfig;

