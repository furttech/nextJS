'use client'

import PostCreateForm from "@/app/_components/_blog/postCreate-form";
import Breadcrumbs from "@/app/_components/_nav/breadcrumbs";
import React from "react";

export default function createPostPage() {

    return (
        <main className="min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Posts', href: '/blog/feed' },
                    {
                        label: 'Create Post',
                        href: '/blog/create',
                        active: true,
                    },
                ]} />
            <div className="h-full w-full">
                <PostCreateForm />
            </div>
        </main>
    )

}