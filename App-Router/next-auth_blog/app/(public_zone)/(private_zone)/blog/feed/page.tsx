import PostTable from "@/app/_components/_blog/postTable";
import { lusitana } from "@/app/_components/fonts";
import { fetchPostsPageCount } from "@/app/_helpers/postActions";
import Search from "@/app/(public_zone)/(private_zone)/search";

export default function viewPostsPage({
    searchParams
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {

    const query: (string | undefined) = searchParams.query || "";
    const currentPage = Number(searchParams.page) || 1;
    const pagesCount = fetchPostsPageCount(query);

    return (
        <>
            <div className="w-full">
                <h1 className={`${lusitana.className} text-2xl`}>
                    View Blog Posts
                </h1>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search invoices..." />
                </div>
                <PostTable query={query} currentPage={currentPage} />
            </div>
        </>
    )

}