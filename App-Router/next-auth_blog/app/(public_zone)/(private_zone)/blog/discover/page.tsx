import DiscoveryTable from "@/app/_components/_blog/_discoveryFeed/discoveryTable";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function DiscoverPost() {

    const currentPage = 1;

    return (

        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Discover Posts', href: '/blog/discover', active:true },
                    { label: 'Published Posts', href: '/blog/published', },
                    { label: 'Manage Posts', href: '/blog/manage', },
                ]}
            />
            <div className="w-full h-full">
                <DiscoveryTable currentPage={currentPage} />
            </div>
        </main>

    )
}