'use server'

import { User } from "@prisma/client";
import prisma from "./prisma";

export async function getUser(email:string): Promise<User | undefined>{
    

    // errors in this area are not caught by try catch
    /*
       
        try{
            Bad Code
            Cause App to crash regardless of try catch
            failure due to compiler error
            independent of the try/catch block
        }catch(error){
            error message handle
        }

    */

    try {
        const user: ( User | null ) = await prisma.user.findUnique({
            where: {
              email: email,
            }
        });

        if(!user){
            throw new Error('User Does Not Exist!');
        }

        return user;

      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
      }
}