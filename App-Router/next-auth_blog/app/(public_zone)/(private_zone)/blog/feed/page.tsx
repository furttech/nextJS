import PostTable from "@/app/_components/_blog/postTable";
import { lusitana } from "@/app/_components/fonts";
import { fetchPostsPageCount } from "@/app/_helpers/postFormActions";
import Search from "@/app/(public_zone)/(private_zone)/search";

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
        <>
            <div className="w-full h-full">
                <h1 className={`${lusitana.className} text-2xl`}>
                    All User Posts
                </h1>
                <div className="mt-4 flex items-center justify-between text-black gap-2 md:mt-8">
                    <Search placeholder="Search invoices..." />
                </div>
                <PostTable query={query} currentPage={currentPage} />
            </div>
        </>
    )

}