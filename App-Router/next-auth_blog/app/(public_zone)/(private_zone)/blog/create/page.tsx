'use client'

import PostCreateForm from "@/app/_components/_blog/postCreate-form";
import React from "react";

export default function createPostPage(){

    return(
        <>
            <div className="h-full w-full">
                 <PostCreateForm />
            </div>
        </>
    )

}