'use server'

import { z } from 'zod';
//import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { setLocalUserSession } from './userActions';

const FormSubmit = z.object({
  email: z.string({
    required_error:'Email is required.',
    invalid_type_error: 'Please enter a Valid email.'
  }).email(),
  password: z.string({
    required_error: 'Password is Required',
    invalid_type_error: 'Invalid Password'
  }).min(10,{message:'Minimum Length : 10'}),
});

// temp state
export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  context?: string | null;
}
export async function authentication(prevState: State, formData: FormData) {
  
  const userData = FormSubmit.safeParse( {
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if(!userData.success){
    return {
      errors: userData.error.flatten().fieldErrors,
      message: 'Invalid Entries : Please Retry',
    }
  }


  try {

    const validSignIn:boolean = await signIn('credentials', userData.data);
 
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type){
        case 'CredentialsSignin':
          return {
            message:'Invalid Credentials'
          };
        
        case 'CallbackRouteError':
          
          console.log("we had a login error: no user");
          return {
            message: 'User Not Found - Please Register',
            context: 'Register'
          }
        
        default:
         
        return {
          message:'Something Wong!'
        };

      }
    }
    throw error;
  }

  revalidatePath('/blog');
  redirect('/blog');

}