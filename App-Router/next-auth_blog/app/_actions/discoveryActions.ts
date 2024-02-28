'use server'

import { UserDisplayData } from "../_lib/definitions";
import prisma from "./prisma";

const ITEMS_PER_PAGE = 6;

export async function fetchUserDiscovery(currentPage: number) {

    const offSet = (currentPage - 1) * ITEMS_PER_PAGE;

    try {

        const userResults = await prisma.user.findMany({

            include: {
                following: true,
                blocked: true,
                profile: true,
            },
            take: ITEMS_PER_PAGE,
            skip: offSet,
        });

        //userResults[0].

        return userResults;

    } catch (error) {

    }

}

export function discoveryList(currentPage: number) {


    
}