'use server'

import { fetchPublishedFilteredPosts } from "@/app/_actions/postFormActions";
import { Post } from "@prisma/client";
import { DeletePost, EditPost } from "../_privateFeed/postButtons";


export default async function PublicPostTable({ currentPage, userId }: { userId:string;  currentPage: number; }) {

    // TODO: Fetch Posts List from database
    const postList: Post[] | undefined = await fetchPublishedFilteredPosts(userId,currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {
                            postList?.map((post) => (
                                <div key={post.id} className="mb-2 w-full rounded-md bg-white p-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div className="m-1 flex text-black">
                                            <p className="flex-auto w-1/3">{post.title}</p>
                                        </div>
                                        <div className="m-1 flex text-black">
                                            <p className="flex-nowrap truncate w-2/3">{post.content}</p>
                                        </div>
                                        <div className="m-1 flex text-red-500">
                                            <p className="flex-auto w-1/6">Tags: {post.tags}</p>
                                        </div>
                                        <div className="m-1 flex text-blue-300">
                                            <p className="flex-auto w-1/6">Status: {
                                                post.published === true ? "Published" : "Un-Published"
                                            }</p>
                                        </div>
                                        <div className="m-1 flex text-gray-500">
                                            <p className="flex-auto w-1/6">Date: {post.postDate.toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <table className="hidden min-w-full text-gray-500 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Post Title
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Content
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Tags
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Date Created
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-blue-300">
                            {
                                postList?.map((post) => (
                                    <tr key={post.id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" >
                                        <td className="whitespace-nowrap p-4">
                                            <p>{post.title}</p>
                                        </td>
                                        <td className="whitespace-nowrap truncate p-3">
                                            <p>{post.content}</p>
                                        </td>
                                        <td className="whitespace-nowrap truncate p-3">
                                            <p>{post.tags}</p>
                                        </td>
                                        <td className="whitespace-nowrap p-3">
                                            <p >{
                                                post.published === true ? "Published" : "Un-Published"
                                            }</p>
                                        </td>
                                        <td className="whitespace-nowrap p-3">
                                            <p>{post.postDate.toDateString()}</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}