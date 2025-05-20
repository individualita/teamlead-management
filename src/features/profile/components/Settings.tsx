import { useState, useEffect, FormEvent } from 'react';
import { updateProfile  } from 'firebase/auth';

import { Button } from '@mui/material';
import { FaPencil } from 'react-icons/fa6';

import { auth } from '../../../shared/config/firebaseConfig';
import { useAuthStore } from '../../auth/store/authStore';

import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';

import Avatar from './Avatar';



const Settings = () => {

    const [name, setName] = useState('');
    const [isNameUpdating, setIsNameUpdating] = useState(false);

    const [photoURL, setPhotoURL] = useState('');
    const [isPhotoUpdating, setIsPhotoUpdating] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useAuthStore();


    const handleUpdateUserName = async (e: FormEvent) => {

        e.preventDefault();

        if (!user) return;

        setIsLoading(true);

        try {
            await updateProfile(auth.currentUser!, {
                displayName: name,
            })

            // Вручную обновляем Zustand-стор, так как onAuthStateChanged не срабатывает
            setUser({
                ...user,
                username: name,
            });
            setName(name);

        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        } finally {
            setIsLoading(false);
            setIsNameUpdating(false);

        }

    };

    const handleUpdateUserPhoto = async (e: FormEvent) => {  

        e.preventDefault();
        
        if (!user) return;

        setIsLoading(true);
        setIsPhotoUpdating(true);

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
            setIsPhotoUpdating(false);
        }
    }


    //загружаем чтобы value было сразу же username. 
    useEffect(() => {
        setName(user?.username || '');
    }, [user]);

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

                <form 
                    onSubmit={handleUpdateUserName} 
                    className='flex flex-col'
                >
                    <div className='flex gap-3 items-center rounded-md relative'>

                        <input 
                            type='text'
                            value={name}
                            name='username' 
                            onChange={(e) => setName(e.target.value)}
                            className={`
                                ${isNameUpdating? 'border': 'border-none'}
                                border-gray-300 rounded-lg px-2 py-2
                                text-base
                                focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
                                hover:border-gray-400
                                disabled:opacity-80 disabled:text-lg disabled:font-bold
                                placeholder-gray-400 
                                transition-all duration-200
                            `}
                            placeholder='Enter your name'
                            disabled={!isNameUpdating}
                            required
                        />


                        {isNameUpdating? (
                            <div className='flex gap-3'>

                                <Button
                                    type='submit' 
                                    variant='contained' 
                                    color='success' 
                                    size='medium'
                                    disabled={isLoading}
                                >
                                    {isLoading && !isPhotoUpdating? 'Saving...' : 'Save'}
                                </Button>

                                <Button
                                    type='button' 
                                    onClick={() => {
                                        setIsNameUpdating(false);
                                        setName(user.username || '')
                                    }} 
                                    variant='text' 
                                    color='warning' 
                                    size='medium'
                                >
                                        Cancel
                                </Button>
                            </div>

                        ) : (
                            
                            <button
                                type='button' 
                                className='absolute right-2 cursor-pointer'
                                onClick={() => setIsNameUpdating(true)}
                            >
                                <FaPencil 
                                    className='text-base'
                                    title='Edit name'
                                /> 
                            </button>

                        )}


                    </div>

                </form>
                
            </header>

            <section className='flex'>
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
                            {isLoading && isPhotoUpdating?  'Changing...' : 'Change'}
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

            </section> 

        </div>
    )
}

export default Settings;