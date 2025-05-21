import { useState, useEffect, FormEvent } from 'react';
import { updateProfile  } from 'firebase/auth';

import { Button } from '@mui/material';
import { FaPencil } from 'react-icons/fa6';

import { auth } from '../../../shared/config/firebaseConfig';
import { useAuthStore } from '../../auth/store/authStore';

import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';


const UserPhotoForm = () => {


    const [photoURL, setPhotoURL] = useState('');
    const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useAuthStore();
    
    
    const handleUpdateUserPhoto = async (e: FormEvent) => {  

        e.preventDefault();
        
        if (!user) return;

        setIsLoading(true);

        try {
            await updateProfile(auth.currentUser!, {
                photoURL
            })

            setUser({...user, photoURL });
            setPhotoURL('');

        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <form 
            aria-label='Change profile picture' 
            onSubmit={handleUpdateUserPhoto}
        >
            
            <div className='flex gap-3'>
                <input 
                    type='text'
                    value={photoURL} 
                    name='photourl'
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className={`
                        border border-gray-300 rounded-lg px-2 py-2
                        text-base
                        focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
                        hover:border-gray-400
                        placeholder-gray-400 placeholder:text-sm
                        transition-all duration-200
                    `}
                    placeholder='Past image link here'
                    required
                />

                <Button
                    type='submit' 
                    variant='contained' 
                    color='success' 
                    size='small'
                    disabled={isLoading}
                    title='Change image'
                >
                    {isLoading?  'Changing...' : 'Change'}
                </Button>
                
                <button
                    type='button'
                    className='
                        p-2 bg-gray-200 rounded-md uppercase text-[13px] cursor-pointer transition
                        hover:bg-gray-300 '
                    onClick={() => setPhotoURL(DEFAULT_URL)}
                    title='Generate default link'
                >
                    Default URL
                </button>


            </div>

        </form>
    )
}

export default UserPhotoForm;