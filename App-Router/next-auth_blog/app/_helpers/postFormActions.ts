'use server'

import { revalidatePath } from "next/cache";
import { userSessionEmail, userSessionId } from "./actions";
import prisma from "./prisma";
import { z } from 'zod';
import { redirect } from "next/navigation";
import { Post } from "@prisma/client";
import { CreatePostForm } from "../_lib/definitions";
import { URLPattern } from "next/server";

const ITEMS_PER_PAGE = 6;

// TODO: Look into using coerce for handling radio button

const createPostObject = z.object({
    title: z.string({
        required_error: 'Title is required.',
        invalid_type_error: 'Title Must be a String.',
    }).max(50, { message: 'Max 50 Characters' }),
    content: z.string({
        required_error: 'A Post is not A Post With Out Words',
        invalid_type_error: 'Post Content Must be a String.',
    }).max(500, { message: 'Max 500 Characters' }),
    tags: z.string({
        invalid_type_error: 'Tags must be Strings',
    }).max(100, { message: 'Max 100 Characters' }),
    published: z.coerce.boolean({
        invalid_type_error: 'Please Select Publish Status'
    })
});


// temp state
export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        image?: string[];
        tags?: string[];
        published?: string[];
    };
    message?: string | null;
    context?: string | null;
 }

export async function fetchPostsPageCount(query?: string) {

    if (!query) {

        console.log("searching for post count");

        try {
            const results = await prisma.user.findMany({
                select: {
                    _count: {
                        select: { posts: true },
                    },
                },
            })

            const count = Math.ceil(Number(results[0]._count.posts) / ITEMS_PER_PAGE);

            return count;

        } catch (error) {

        }

    } else {

        try {
            const results = await prisma.user.findMany({
                include: {
                    posts: {
                        where: {
                            title: query,
                        },
                        orderBy: {
                            title: 'asc',
                        }
                    },
                },
            });

            const resultCount = Math.ceil(Number(results.length) / ITEMS_PER_PAGE);

            return resultCount;

        } catch (error) {

        }

    }
}

export async function fetchFilteredPosts(query: string, currentPage: number) {

    const offSet = (currentPage - 1) * ITEMS_PER_PAGE;

    if (!query) {
        try {
            console.log('searching for all posts');

            const results = await prisma.user.findMany({
                select: {
                    posts: true,
                },
                take: ITEMS_PER_PAGE,
                skip: offSet,
            });

            return results[0].posts;
        } catch (error) {

        }
    } else {

        console.log('Searching for filtered posts => ', query);

        try {
            const results = await prisma.user.findMany({
                include: {
                    posts: {
                        where: {
                            title: query,
                        },
                        orderBy: {
                            title: 'asc',
                        },
                    },
                },
                take: ITEMS_PER_PAGE,
                skip: offSet,
            });

            return results[0].posts;
        } catch (error) {

        }
    }

}

export async function createPost(state: State, formData: FormData) {

    // fetch email from user session data
    const userEmail: string | null | undefined = await userSessionEmail();

    // Get form data from Post creation
    const validateFields = createPostObject.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        published: formData.get('published'),
    });

    // validate fields against zod 
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid Entries : Please Retry',
        }
    }


    // create ISO formatted string from current date
    const currentDate = new Date().toISOString();

    // attempt to create new post on DB, log error on failure
    try {
        if (userEmail) {
            const result = await prisma.post.create({
                data: {
                    title: validateFields.data.title,
                    content: validateFields.data.content,
                    tags: validateFields.data.tags,
                    published: validateFields.data.published,
                    postDate: currentDate,
                    author: { connect: { email: userEmail } },
                },
            });
        }

    } catch (error) {

        console.error(error);

        return {
            // no error passed here
            message: "Failed to Create Post",
            context: 'Create Post'
        }
    }

    revalidatePath('/blog/feed');
    redirect('/blog/feed');

}

export async function deletePost(postData: string) {

   //TODO: Add check for user id to post match from session
   // const usrId: string = await userSessionId();

    try {
        if (postData) {
            const delResults = await prisma.post.delete({
                where: {
                    id: postData,
                }
            })
        }

        revalidatePath('/blog/feed');
        redirect('/blog/feed');

    } catch (error) {

    }
}

export async function updatePost(state: State, formData: FormData){

    // Get form data from Post creation
    const validateFields = createPostObject.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        published: formData.get('published'),
    });

    // validate fields against zod 
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid Entries : Please Retry',
        }
    }


    // create ISO formatted string from current date
    const currentDate = new Date().toISOString();
    const postId = "";

    try {
        
        const updatePostResult = await prisma.post.update({
            where:{
                id: postId,
            },
            data: {
                title: validateFields.data.title,
                content: validateFields.data.content,
                tags: validateFields.data.tags,
                published: validateFields.data.published,
                postDate: currentDate,
            }
        })

    } catch (error) {
        
    }


    revalidatePath('/blog/feed');
    redirect('/blog/feed');
}

export async function fetchPostByID(pid:string){
    
    try {
        
        const postData:Post|null = await prisma.post.findUnique({
                where:{
                    id:pid,
                }
        })

        const post:CreatePostForm ={
            title: ( postData?.title || "" ),
            content: ( postData?.content || "" ),
            tags: ( postData?.tags || ""),
            published: (postData?.published || false),
        }
        
        return post;

    } catch (error) {
        
    }
  
}

export async function editPostNav(postId:string){
    redirect(`/blog/edit/${postId}`);
}