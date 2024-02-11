import UserDetails from "@/app/_components/_user/user-details";

export default function Page(){

    return(
        <main>
        <div className="flex flex-col flex-auto">
            <div className="w-full">
                <h1>  User Page </h1>
                <UserDetails/>
            </div>
            <div className="w-full">

            </div>
        </div>
        </main>
    )
}