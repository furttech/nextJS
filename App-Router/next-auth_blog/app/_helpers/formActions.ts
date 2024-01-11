'use server'

import { z } from 'zod';
//import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from './auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter amount greater than $0.'}),
    status: z.enum(['pending','paid'], {
      invalid_type_error: 'Please select an invoice status!'
    }),
    date: z.string(),
});

// old project code to be removed
//const CreateInvoice = FormSchema.omit({id:true, date: true});
//const UpdateInvoice = FormSchema.omit({id:true, date: true});

// temp state
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
}

export async function authentication(prevState: string|undefined, formData: FormData,) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if(error instanceof AuthError){
        switch (error.type){
          case 'CredentialsSignin':
            return 'Invalid Credentials';
          
          default:
            return 'Something Wong!';
  
        }
      }
      throw error;
    }
  }