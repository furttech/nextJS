'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateUser = z.object({
    username: z.string({
      required_error: 'UserName is required.',
      invalid_type_error: 'UserName Must be a String.'
    }),
    email: z.string({
      required_error:'Email is required.',
      invalid_type_error: 'Please enter a Valid email.'
    }).email(),
    password: z.string({
      required_error: 'Password is Required',
      invalid_type_error: 'Invalid Password'
    }).min(10,{message:'Minimum Length : 10'}),

  })

// temp state
export type State = {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
      image?: string[];
    };
    message?: string | null;
}

export async function updateUser(prevState: State , formData: FormData){
    
    const validateFields = CreateUser.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        cmp_password: formData.get('cmp_password')
    });
  
    if(!validateFields.success){
      return {
        errors: validateFields.error.flatten().fieldErrors,
        message: 'Invalid Entries : Please Retry',
      }
    }

    
    try {

        // Todo add promise all to await
        const uEx = true;
        const eEx = true;

        if((eEx || uEx)){
        /// TODO Handle the user or email exist error
            console.log("yeas we got here! : but it failed!");
            return({
                message:"Email or UserName Already Exist!",
            })
        }
    } catch (error) {
      console.error('User Creation Failed',error);
      throw new Error('User Edit Failed.')
    }

    revalidatePath('/user');
    redirect('/user');

}