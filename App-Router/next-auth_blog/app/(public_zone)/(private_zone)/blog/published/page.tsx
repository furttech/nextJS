import { userSessionId } from "@/app/_actions/userActions";
import PublicPostTable from "@/app/_components/_blog/_publicFeed/postPublicTable";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function FeedPage() {

    const curPage = 1;
    const userId = await userSessionId();

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Posts', href: '/blog/manage' },
                    {
                        label: 'Public Posts',
                        href: '/blog/published',
                        active: true,
                    },
                ]} />
            <div className="w-full h-full">
                <PublicPostTable userId={userId} currentPage={curPage} />
            </div>
        </main>
    )
}