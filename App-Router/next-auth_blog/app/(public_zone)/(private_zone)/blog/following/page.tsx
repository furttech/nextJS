import FollowerTable from "@/app/_components/_blog/_followersFeed/postFollowersTable";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function FollowingPosts() {

    const currentPage = 1;

    return (

        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Following', href: '/blog/following', active:true, },
                    { label: 'Discover Posts', href: '/blog/discover', active:false, },
                    { label: 'Published Posts', href: '/blog/published',active:false, },
                    { label: 'Manage Posts', href: '/blog/manage',active:false, },
                ]}
            />
            <div className="w-full h-full">
                <FollowerTable currentPage={currentPage} />
            </div>
        </main>

    )
}