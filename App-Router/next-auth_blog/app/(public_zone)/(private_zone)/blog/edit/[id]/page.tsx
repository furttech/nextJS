import PostEditForm from "@/app/_components/_blog/postEdit-form";
import React from "react";
import { fetchPostByID } from "@/app/_helpers/postFormActions";
import { CreatePostForm } from "@/app/_lib/definitions";

export default async function editPostPage({params}: {params: {id:string}}){

    const pid:string = params.id;

    const postFetchDetails:CreatePostForm|null|undefined = await fetchPostByID(pid);

    return(
        <>
            <div className="h-full w-full">
                 <PostEditForm postDetails={postFetchDetails}  />
            </div>
        </>
    )

}