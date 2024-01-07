import { useSession, signIn, signOut } from "next-auth/react";

export default function post(){
    const { data: session } = useSession()

    if (session){
        return(
           <>
            <p>Hello {session.user.name}</p>
            <h1>Welcome To The Post Page</h1>
            <button onClick={() => signOut()}>Sign out</button>
           </>
        )
    } else {
        return(
            <>
            <p>You're not allowed to view this page!</p>
            <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }
  
}

