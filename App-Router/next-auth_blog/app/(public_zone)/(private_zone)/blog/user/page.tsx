import UserDetails from "@/app/_components/_user/user-details";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default function Page() {

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'User Settings',
                        href: '/blog/user',
                        active: true,
                    },
                ]} />
            <div className="flex flex-col flex-auto">
                <div className="w-full">
                    <UserDetails />
                </div>
            </div>
        </main>
    )
}