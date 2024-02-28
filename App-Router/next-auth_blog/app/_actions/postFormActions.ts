'use server'

import { revalidatePath } from "next/cache";
import { userSessionEmail, userSessionId } from "./userActions";
import prisma from "./prisma";
import { z } from 'zod';
import { redirect } from "next/navigation";
import { Post } from "@prisma/client";
import { CreatePostForm } from "../_lib/definitions";


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
    published: z.enum(['true', 'false'], {
        required_error: "value must be selected",
        invalid_type_error: "true or false only",
    }),
    image: z.string({
        invalid_type_error: "Image must be of type string",
        required_error: "User Image String is Required",
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

    const userId = await userSessionId();

    if (!query) {

        console.log("searching for post count");

        try {
            const results = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    _count: {
                        select: {
                            posts: true,
                        },
                    },
                },
            })

            const count = Math.ceil(Number(results?._count.posts) / ITEMS_PER_PAGE);

            return count;

        } catch (error) {

        }

    } else {

        console.log('Searching for filtered posts => ', query);

        try {
            const results = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    _count: {
                        select: {
                            posts: {
                                where: {
                                    title: query,
                                },
                            },
                        },
                    },
                },
            });

            const count = Math.ceil(Number(results?._count.posts) / ITEMS_PER_PAGE);

            return count;

        } catch (error) {

        }

    }
}

/**
 * 
 * @param currentPage : current page used for paging
 * @returns : Post list object demarcated by follower id
 */
export async function fetchFollowPosts(currentPage?: number) {

    // fetch userId from session representing current user.
    const userId = await userSessionId();

    try {

        // prisma query fetches all follower Ids from current user
        const followedAcctIdList = await prisma.followedAccount.findMany({
            where: {
                userId: {
                    equals: userId,
                },
            }
        });

        // check user follower count is not zero
        if (followedAcctIdList.length > 0) {

            // create and array of objects to store fetched posts by follower Id
            let PostList: Array<{ authorId: string, posts: Array<Post> }> = [];

            // loop thru each of the followed users
            for (let i = 0; i < followedAcctIdList.length; i++) {

                // set the follower Id
                const f_id = followedAcctIdList[i].f_accountId;

                // prisma query fetching all published posts matching follower Id
                const followerPosts: Array<Post> = await prisma.post.findMany({
                    where: {
                        AND: [
                            {
                                authorId: {
                                    equals: f_id,
                                },
                            },
                            {
                                published: {
                                    equals: true,
                                }
                            }
                        ]
                    }
                });

                // check object is not null
                if (followerPosts) {

                    // create an array of Post Objects demarcated by authorId (followed user id)
                    PostList[i] = {
                        // set follower user ID for each PostList
                        authorId: f_id,
                        // set array of posts for each user
                        posts: followerPosts,

                    };
                }
            }

            return PostList;

        }

    } catch (error) {

    }

}

export async function fetchFilteredPosts(query: string, currentPage: number) {

    const offSet = (currentPage - 1) * ITEMS_PER_PAGE;

    // fetch userId from session representing current user.
    const userId = await userSessionId();

    if (!query) {
        try {
            console.log('searching for all posts');

            const results = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    posts: {
                        take: ITEMS_PER_PAGE,
                        skip: offSet,
                        orderBy: {
                            postDate: 'asc'
                        }
                    },
                },
            });

            return results?.posts;

        } catch (error) {

        }
    } else {

        console.log('Searching for filtered posts => ', query);

        try {
            const results = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    posts: {
                        where: {
                            title: query,
                        },
                        orderBy: {
                            postDate: "asc",
                        },
                        take: ITEMS_PER_PAGE,
                        skip: offSet,
                    }
                }
            });

            return results?.posts;

        } catch (error) {

        }
    }

}


export async function fetchPublishedFilteredPosts(userId: string, currentPage: number) {

    const offSet = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        console.log('searching for published filtered posts');

        const results = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                posts: {
                    where: {
                        published: true,
                    },
                    orderBy: {
                        postDate: "asc",
                    },
                    take: ITEMS_PER_PAGE,
                    skip: offSet,
                }
            },
        });

        return results?.posts;

    } catch (error) {

    }
}

export async function fetchSinglePostByID(pid: string) {

    try {

        const postData: Post | null = await prisma.post.findUnique({
            where: {
                id: pid,
            }
        })

        const post: CreatePostForm = {
            title: (postData?.title || ""),
            content: (postData?.content || ""),
            tags: (postData?.tags || ""),
            published: (postData?.published || undefined),
            image: (postData?.image || "")
        }

        //console.log("fetched published: " + postData?.published);

        return post;

    } catch (error) {

    }

}


export async function addUserFollower(followerID: string) {

    // fetch user id from session
    const userId = await userSessionId();
    // create ISO formatted string from current date
    const currentDate = new Date().toISOString();


    try {

        const addUser = await prisma.followedAccount.create({
            data: {
                f_accountId: followerID,
                f_Date: currentDate,
                userAcct: { connect: { id: userId } }
            }
        })


    } catch (error) {

    }

}


export async function editPostNav(postId: string) {

    redirect(`/blog/edit/${postId}`);
}


/*   POST CRUD Functions  */

export async function createPost(state: State, formData: FormData) {

    // fetch email from user session data
    const userEmail: string | null | undefined = await userSessionEmail();

    // Get form data from Post creation
    const validateFields = createPostObject.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        published: formData.get('published'),
        image: formData.get('image'),
    });

    // validate fields against zod 
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid Entries : Please Retry',
        }
    }

    let pubValue = false;
    validateFields.data.published === 'true' ? pubValue = true : null;
    validateFields.data.published === 'false' ? pubValue = false : null;

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
                    published: pubValue,
                    postDate: currentDate,
                    image: validateFields.data.image,
                    // TODO:  change to user ID association instead of Email
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

export async function updatePost(postId: string, state: State, formData: FormData) {


    //console.log("form status: "+ formData.get('published'));

    // Get form data from Post creation
    const validateFields = createPostObject.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        published: formData.get('published'),
        image: formData.get('image'),
    });

    // validate fields against zod 
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid Entries : Please Retry',
        }
    }

    let pubValue = false;
    validateFields.data.published === 'true' ? pubValue = true : null;
    validateFields.data.published === 'false' ? pubValue = false : null;

    //console.log("validate publish status: "+ validateFields.data.published);

    // create ISO formatted string from current date
    const currentDate = new Date().toISOString();

    try {

        const updatePostResult = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                title: validateFields.data.title,
                content: validateFields.data.content,
                tags: validateFields.data.tags,
                published: pubValue,
                image: validateFields.data.image,
                postDate: currentDate,
            }
        })

    } catch (error) {

    }

    revalidatePath('/blog/feed');
    redirect('/blog/feed');
}
