import { fetchFollowPosts } from "@/app/_actions/postFormActions"
import { Post } from "@prisma/client";

export default async function FollowerTable({ currentPage }: { currentPage: number }) {

    const postList: Array<{ authorId: string, posts: Array<Post> }> | undefined = await fetchFollowPosts(currentPage);

    return (

        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

                    {
                       

                    }

                </div>
            </div>
        </div>
    )

}