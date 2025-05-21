import { useState, useEffect, FormEvent } from 'react';
import { updateProfile  } from 'firebase/auth';

import { Button } from '@mui/material';
import { FaPencil } from 'react-icons/fa6';

import { auth } from '../../../shared/config/firebaseConfig';
import { useAuthStore } from '../../auth/store/authStore';

import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';

import UserNameForm from './UserNameForm';

import UserPhotoForm from './UserPhotoForm';

import Avatar from './Avatar';



const Settings = () => {

    const { user, setUser } = useAuthStore();

    if (!user) {
        return <p className='text-center text-red-500'>No user signed in.</p>;
    }

    return (
        <div className='flex flex-col items-center gap-5'>

            <header aria-labelledby='profile-heading' className='flex flex-col gap-3'>

                <div className='m-auto w-24 h-24 rounded-full bg-white shadow-md border-2 border-gray-300 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                    <Avatar 
                        src={user?.photoURL}
                        username={user?.username}  
                    />
                </div>

                <UserNameForm 
                    currentName={user.username || 'User'}
                />
                
            </header>

            <section className='flex'>
                <UserPhotoForm />

            </section> 

        </div>
    )
}

export default Settings;