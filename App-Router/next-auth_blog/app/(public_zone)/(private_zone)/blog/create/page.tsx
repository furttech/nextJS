import PostCreateForm from "@/app/_components/_blog/postCreate-form";

export default function createPostPage(){
    return(
        <>
            <div>
                 <PostCreateForm title={""} content={""} tags={""} />
            </div>
        </>
    )

}