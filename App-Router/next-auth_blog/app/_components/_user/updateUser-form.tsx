'use client'

import { updateUser } from "@/app/_actions/updateFormActions";
import { UpdateUserForm } from "@/app/_lib/definitions";
import { UserIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { lusitana } from "../fonts";
import { KeyIcon } from "@heroicons/react/24/solid";
import { AtSymbolIcon } from "@heroicons/react/24/solid";
import { Button } from "../_nav/button";

export default function UpdateForm(userDetails?: UpdateUserForm) {

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateUser, initialState);

  return (
    <form action={dispatch}>
      <div>
        <h1 className={`${lusitana.className} text-black  mb-3 text-2xl`}>
          Edit User Details
        </h1>
        <div>
          <label id="username" htmlFor="username">
            UserName
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="UserName"
              defaultValue={userDetails?.username}
              required
              aria-describedby="username-error"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id='username-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.username &&
              state.errors.username.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              defaultValue={userDetails?.email}
              placeholder="Enter your email address"
              required
              aria-describedby='email-error'
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id='email-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.email &&
              state.errors.email.map((error: string) => (
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
              className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={10}
              aria-describedby='pass-error'
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id='pass-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.password &&
              state.errors.password.map((error: string) => (
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
            htmlFor="image"
          >
            Upload an Image
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="image"
              type="text"
              name="image"
              placeholder="User Image"
              required
              minLength={10}
              aria-describedby='cmp-error'
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id='cmp-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.image &&
              state.errors.image.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>
        <Button type='submit' aria-describedby='sub-error' >Register</Button>
        <div id='sub-error' aria-live='polite' aria-atomic='true'>
          {
            state?.message
          }
        </div>
      </div>
    </form>
  )
}