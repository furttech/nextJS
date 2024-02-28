import PostTable from "@/app/_components/_blog/_privateFeed/postPrivateTable";
import { fetchPostsPageCount } from "@/app/_actions/postFormActions";
import Search from "@/app/(public_zone)/(private_zone)/search";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function viewPostsPage({
    searchParams
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {

    const query: (string | undefined) = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const pagesCount = await fetchPostsPageCount(query);

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Published Posts', href: '/blog/published', },
                    { label: 'Manage Posts', href: '/blog/manage', active: true, },
                ]} 
            />
            <div className="w-full h-full">
                <div className="mt-4">
                    <Search placeholder="Search Private Posts..." />
                </div>
                <PostTable query={query} currentPage={currentPage} />
            </div>
        </main>
    )

}