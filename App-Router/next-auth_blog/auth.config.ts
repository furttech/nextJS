
import type { NextAuthConfig } from "next-auth";
import { addMillisecondsToDate } from "./app/_lib/utils";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }){
            const isLoggedIn = !!auth?.user;
            const isOnFeed = nextUrl.pathname.startsWith('/blog');
            
            if(isOnFeed){

                /* Furt is lazy being old and obnoxious way
                    //if(isLoggedIn) return true;
                    //return false;
                */

                // The better Way :)
                return isLoggedIn;

            } else if (isLoggedIn){
                return Response.redirect(new URL('/blog', nextUrl));
            }
        },
        session({session,token}){

            // set session expiration to 3 minutes
            if(session.expires){
                session.expires = addMillisecondsToDate(600000)?.toString();
            }
            
            if(session.user){
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
                session.user.id = token.id as string; 
            }
            return session;
        },
        jwt({ token, user}) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                console.log("user Id:" , user.id);
                token.id = user.id;
            }
            return token;
        }
    },
    providers: []
} satisfies NextAuthConfig;


            //console.log( "jwt:"+ token.email + ":" + token.name + ":" + token.sub );
            /*
            if(trigger==="signIn"){
                // add token to database and create session
                if(user.email){
                    const email:(string|null|undefined) = user?.email;
                    setLocalUserSession(email);
                }

            }
            */