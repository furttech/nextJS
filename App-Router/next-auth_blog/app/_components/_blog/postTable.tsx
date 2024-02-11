import { fetchFilteredPosts } from "@/app/_helpers/postActions";
import { Post } from "@prisma/client";

export default async function PostTable({ query, currentPage }: { query: string; currentPage: number; }) {

    // TODO: Fetch Posts List from database
    const postList:Post[]|undefined = await fetchFilteredPosts(query, currentPage);

    return (

        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div>
                        {
                            postList?.map((post) => (
                                <div key={post.id} className="mb-2 w-full rounded-md bg-white p-4">
                                    <div className="flex items-center justify-between border-b pb-4">

                                        <div>
                                            <div className="mb-2 flex items-center">
                                                <p>{post.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}