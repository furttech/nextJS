import PostTable from "@/app/_components/_blog/postTable";
import { lusitana } from "@/app/_components/fonts";
import { fetchPostsPageCount } from "@/app/_actions/postFormActions";
import Search from "@/app/(public_zone)/(private_zone)/search";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function viewPostsPage({
    searchParams
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {

    const query: (string | undefined) = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const pagesCount = await fetchPostsPageCount(query);

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: 'Public Feed',
                        href: '/blog/wall',
                    },
                    { label: 'Private Posts', href: '/blog/feed', active: true, },
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