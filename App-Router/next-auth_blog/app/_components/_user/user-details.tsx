'use server'

import { fetchUserByEmail, userSessionEmail, userSessionIcon, userSessionId, userSessionUserName } from '@/app/_actions/userActions';
import { lusitana } from '../fonts';
import { User } from '@prisma/client';

export default async function UserDetails(){
    
    // fetching session data
    const userName:( string | null | undefined ) = await userSessionUserName();
    const email:( string | null | undefined ) = await userSessionEmail();
    const icon:( string | null | undefined ) = await userSessionIcon();
    const id:( string ) = await userSessionId();

    // random inits for accessing user data from email.
   
    /* 
    // Note:
    // naming individually is verbose and wasteful coding 
    // utilizing a single object with predefined class provides
    // structured clean code.

    let d_email:( string | null | undefined ) = "";
    let d_userName:( string | null | undefined ) = "";
    let d_icon:( string | null | undefined ) = "";
    let d_isVerified:( Date | null | undefined ) = null;
    let d_name:( string | null | undefined ) = "";
    */

    let userData: ( User | undefined );

    if(email){
        userData = await fetchUserByEmail(email);
    }

    return (
        <div className="flex flex-col h-auto rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <div className='flex flex-col items-center'>
                <h1 className={`${lusitana.className} text-black  mb-3 text-3xl`}>
                    User Info from Session:
                </h1>
            </div>
            <div className="flex flex-col items-start">
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    Email:  {email}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    UserName:  {userName}
                    </label>
                </div>
                <div className='relative'>
                <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    Avatar:  {icon}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    Id:  {id}
                    </label>
                </div>
            </div>
            <div className='w-full h-4'></div>
            <div className='flex flex-col items-center'>
                <h1 className={`${lusitana.className} text-black  mb-3 text-3xl`}>
                    User Info from Database:
                </h1>
            </div>
            <div className="flex flex-col items-start">
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase Email:  {userData?.email}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase UserName:  {userData?.username}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase Avatar:  {userData?.image}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase Verify Date:  {userData?.emailVerified?.toDateString()}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase Name:  {userData?.name}
                    </label>
                </div>
                <div className='relative'>
                    <label className={`${lusitana.className} mb-3 mt-5 block text-2xl font-medium text-gray-900`}>
                    DataBase Id:  {userData?.id}
                    </label>
                </div>
            </div>
        </div>
    )
    
} 