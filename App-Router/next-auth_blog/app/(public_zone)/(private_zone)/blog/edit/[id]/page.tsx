'use server'

import PostEditForm from "@/app/_components/_blog/_privateFeed/postEdit-form";
import React from "react";
import { fetchSinglePostByID } from "@/app/_actions/postFormActions";
import { CreatePostForm } from "@/app/_lib/definitions";
import notFound from "./not-found";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";

export default async function editPostPage({ params }: { params: { id: string } }) {

    const pid: string = params.id;

    if (!pid) {
        notFound();
    }

    const postFetchDetails: CreatePostForm | null | undefined = await fetchSinglePostByID(pid);

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Manage Posts', href: '/blog/manage' },
                    {
                        label: 'Edit Post',
                        href: '/blog/feed/${id}/edit',
                        active: true,
                    },
                ]} />
            <div className="h-full w-full">
                <PostEditForm postId={pid} postDetails={postFetchDetails} />
            </div>
        </main>
    )

}