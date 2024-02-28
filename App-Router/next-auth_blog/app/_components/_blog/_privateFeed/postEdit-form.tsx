'use client'

import { updatePost } from "@/app/_actions/postFormActions";
import { useFormState } from "react-dom";
import { lusitana } from "../../fonts";
import { BookOpenIcon, ComputerDesktopIcon, HashtagIcon, PhotoIcon, PencilIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { CreatePostForm } from "@/app/_lib/definitions";
import { Button } from "../../_nav/button";

export default function PostEditForm({ postDetails, postId }: { postDetails?: CreatePostForm; postId: string }) {

    const initialState = { message: null, errors: {} };
    const updatePostWithId = updatePost.bind(null, postId);
    const [state, dispatch] = useFormState(updatePostWithId, initialState);


    return (
        <form id="postForm" action={dispatch}>
            <div>

                {/*!-- Post Title Input Field -- !*/}
                <div>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-s font-bold text-gray-900`} htmlFor="title" id="title">
                        Title:
                    </label>
                    <div className="relative">
                        <input
                            className=" block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Post Title"
                            defaultValue={postDetails?.title}
                            required
                            aria-describedby="title-error"
                        />
                        <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id='title-error' aria-live='polite' aria-atomic='true'>
                        {
                            state?.errors?.title &&
                            state?.errors.title.map((error: string) => (
                                <p className='mt-2 text-sm text-red-500' key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>

                {/*!-- Post Content Input Field --!*/}
                <div>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-s font-bold text-gray-900`} htmlFor="content" id="content">
                        Post:
                    </label>
                    <div className="relative">
                        <textarea
                            form="postForm"
                            rows={5}
                            className="text-wrap w-full line-clamp-4 rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="content"
                            name="content"
                            placeholder="Post content"
                            defaultValue={postDetails?.content}
                            required
                            aria-describedby="content-error"
                        />
                        <ComputerDesktopIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id='content-error' aria-live='polite' aria-atomic='true'>
                        {
                            state?.errors?.content &&
                            state?.errors.content.map((error: string) => (
                                <p className='mt-2 text-sm text-red-500' key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>

                {/*!-- Tags Input Field --!*/}
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="tags" id="tags">
                        Tags:
                    </label>
                    <div className="relative">
                        <input
                            className=" block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="tags"
                            type="text"
                            name="tags"
                            placeholder="Post tags"
                            defaultValue={postDetails?.tags}
                            required
                            aria-describedby="tags-error"
                        />
                        <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id='tags-error' aria-live='polite' aria-atomic='true'>
                        {
                            state?.errors?.tags &&
                            state?.errors.tags.map((error: string) => (
                                <p className='mt-2 text-sm text-red-500' key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>

                {/*!-- Image input field --!*/}
                {/*!-- TODO Add Proper File Upload Function --!*/}
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                        htmlFor="image"
                    >
                        Upload an Image
                    </label>
                    <div className="relative">
                        <input
                            className=" block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="image"
                            type="text"
                            name="image"
                            placeholder="User Image"
                            required
                            minLength={10}
                            defaultValue={postDetails?.image}
                            aria-describedby='cmp-error'
                        />
                        <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    <div id='cmp-error' aria-live='polite' aria-atomic='true'>
                        {
                            state?.errors?.image &&
                            state?.errors.image.map((error: string) => (
                                <p className='mt-2 text-sm text-red-500' key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>

                {/*!-- Published Radio Button --!*/}
                <fieldset>
                    <legend className="mb-3 mt-5 block text-xs font-medium text-gray-900">
                        Set the Post Status
                    </legend>
                    <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <input
                                    id="public_publish"
                                    name="published"
                                    type="radio"
                                    value="true"
                                    defaultChecked={postDetails?.published ? true : false }
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby='status-error'
                                />
                                <label
                                    htmlFor="public_publish"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-gray-600"
                                >
                                    Publish to Feed <PencilIcon className="h-4 w-4" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="private_publish"
                                    name="published"
                                    type="radio"
                                    value="false"
                                    defaultChecked={postDetails?.published ? false : true }
                                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                                    aria-describedby='status-error'
                                />
                                <label
                                    htmlFor="private_publish"
                                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                                >
                                    Private Edit <PaperClipIcon className="h-4 w-4" />
                                </label>
                            </div>
                        </div>
                        <div id='status-error' aria-live='polite' aria-atomic='true'>
                            {
                                state?.errors?.published &&
                                state?.errors.published.map((error: string) => (
                                    <p className='mt-2 text-sm text-red-500' key={error}>
                                        {error}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </fieldset>

                <div className="flex justify-end gap-1.5 py-3">
                    {/*!-- Submit Button --!*/}
                    <Button type='submit' aria-describedby='sub-error' >Update Post</Button>
                    <div id='sub-error' aria-live='polite' aria-atomic='true'>
                        {
                            state?.message
                        }
                    </div>
                </div>
            </div>
        </form>
    )

}