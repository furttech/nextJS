'use server'

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from './prisma';
import { User } from '@prisma/client';
import { FormUser} from '../_lib/definitions';

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
  cmp_password: z.string({
    invalid_type_error: 'Invalid Password'
  }).min(10,{message:'Minimum Length : 10'}),
}).refine((data)=> data.password === data.cmp_password,{
  message:"Passwords Do Not Match",
  path: ['cmp_password'],
});


// temp state
export type State = {
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
      cmp_password?: string[];
    };
    message?: string | null;
}

async function emailExists(email: string):Promise<boolean>{

  const user: ( User | null ) = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  
  if(user) return true;
  return false;
}

async function userExists(username: string):Promise<boolean>{
  
  const user: ( User | null ) = await prisma.user.findUnique({
    where: {
      username: username,
    }
  });

  if(user) return true;
  return false;
}

async function addUser(userData: FormUser){

    try {
      const result:any = await prisma.user.create({data: userData})
    } catch (error) {
      console.error('User Creation Failed',error);
      throw new Error('User Creation Failed.')
    }
    
}

export async function registerUser(prevState: State , formData: FormData){
    
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

    const uEx: boolean = await userExists(validateFields.data.username);
    const eEx: boolean = await emailExists(validateFields.data.email);

    if((eEx || uEx)){
      /// TODO Handle the user or email exist error
      console.log("yeas we got here! : but it failed!");
      return({
        message:"Email or UserName Already Exist!",
      })
    }
  } catch (error) {
    throw error
  }

  const bcPassword:string = await bcrypt.hash(validateFields.data.password, 12);

  const uData: FormUser = {
    name: validateFields.data.username,
    email: validateFields.data.email,
    username: validateFields.data.username,
    password: bcPassword,
  };

  // creates a new User with form data 
  addUser(uData);

  revalidatePath('/login');
  redirect('/login');
}