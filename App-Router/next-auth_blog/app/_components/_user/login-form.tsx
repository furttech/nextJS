'use client';

import { lusitana } from '@/app/_components/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/_components/_nav/button';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { SignInUserForm } from '@/app/_lib/definitions';
import { State, authentication } from '@/app/_actions/loginFormActions';
import Link from 'next/link';

export default function Form(formDetails:SignInUserForm) {

  const initialState = {message:null, errors:{}};
  const [state, dispatch ] = useFormState(authentication,initialState);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-black text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-black border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                aria-describedby='email-error'
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id='cmp-error' aria-live='polite' aria-atomic='true'>
            {
               state.errors?.email &&
              state.errors.email.map((error:string)=>(
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-black border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                aria-describedby='pass-error'
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <LoginButton />
        </div>
        <div className='mt-4'>
          <ErrorState value={state}/>
        </div>
        <div 
          className="flex h-8 items-end space-x-1"
          aria-live='polite'
          aria-atomic="true"
        >
            {
              state.message &&
              (
                <>
                  <ExclamationCircleIcon className='h-5 w-5 text-red-500' />
                  <p className='text-sm text-red-500'>{state.message}</p>
                </>
              )
            }
        </div>
      </div>
    </form>
  );
}

function ErrorState(taco:{value:State}){

  if(taco.value.context === "Register"){
    return(
      <>
         <Link className='text-grey' href="/register">
          <Button className='mt-4 w-full '>
            Register 
            <KeyIcon className="ml-auto h-5 w-5 text-gray-50" />
          </ Button>
        </Link>
      </>
    );
  }

}

function LoginButton() {
  const {pending} = useFormStatus();

  return (
    <Button
      className="mt-4 w-full"
      aria-disabled={pending}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );

}