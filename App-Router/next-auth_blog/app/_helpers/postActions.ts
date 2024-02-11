'use server'

import { userSessionEmail } from "./actions";
import prisma from "./prisma";
import { z } from 'zod';

const ITEMS_PER_PAGE = 6;

const createPostObject = z.object({
    title: z.string({
        required_error: 'Title is required.',
        invalid_type_error: 'Title Must be a String.',
    }),
    content: z.string({
        required_error: 'A Post is not A Post With Out Words',
        invalid_type_error: 'Title Must be a String.',
    }).max(350, { message: 'Max Characters 350' }),
    tags: z.string({
        invalid_type_error: 'Tags must be Strings',
    }).max(100, { message: 'Max Characters 100' }),
    published: z.enum(['true','false'], {
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

        const results = await prisma.user.findMany({
            select: {
                _count: {
                    select: { posts: true },
                },
            },
        })

        const count = Math.ceil(Number(results[0]._count.posts) / ITEMS_PER_PAGE);

        return count;

    }


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

export async function fetchFilteredPosts(query: string, currentPage: number) {

    const offSet = (currentPage - 1) * ITEMS_PER_PAGE;

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
        })

        return results[0].posts;
    } catch (error) {

    }

}

export async function createPost(state: State, formData: FormData) {

    const userEmail: string | null | undefined = await userSessionEmail();

    const validateFields = createPostObject.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        published: formData.get('published'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid Entries : Please Retry',
        }
    }

    let published = true;

    if(validateFields.data.published === 'false'){
        published = false;
    }

    try {

        if (userEmail) {
            const result = await prisma.post.create({
                data: {
                    title: validateFields.data.title,
                    content: validateFields.data.content,
                    tags: validateFields.data.tags,
                    published: published,
                    postDate: Date().toString(),
                    author: { connect: { email: userEmail } },
                },
            });
        }

    } catch (error) {

        console.error(error);

        return {
            message: "Failed to Create Post",
            context: 'Create Post'
        }
    }

    return {
        message: 'Post Created Successfully',
        context: 'Create Post'
    }
}