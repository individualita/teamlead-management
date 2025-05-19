import { useState, useEffect } from 'react';
import { useAuthStore } from '../../auth/store/authStore';

import { FaPencil } from 'react-icons/fa6';

import { TextField, Button } from '@mui/material';


import { getAuth, deleteUser, updateProfile  } from 'firebase/auth';

import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';
import { auth } from '../../../shared/config/firebaseConfig';


const Settings = () => {

    const [value, setValue] = useState('');
    const [isNameChanging, setIsNameChanging] = useState(false);
    const [isPhotoChanging, setIsPhotoChanging] = useState(false);
    const [photoURL, setPhotoURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useAuthStore();

    console.log('auth current user', auth.currentUser);

    const handleUpdateUserName = async () => {

        if (!user) return;

        setIsLoading(true);

        try {
            await updateProfile(auth.currentUser!, {
                displayName: value,
            })

            // Вручную обновляем Zustand-стор, так как onAuthStateChanged не срабатывает
            setUser({
                ...user,
                username: value,
            });
            setValue('');
            setIsNameChanging(false);

        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }

    };

    const handleUpdateUserPhoto = async () => {

        if (!user) return;
        try {
            await updateProfile(auth.currentUser!, {
                photoURL
            })

            setUser({...user, photoURL })

        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }


    const handleChangeName = () => {
        setIsNameChanging(true);
        setValue(user?.username || '');
    };

    const handleChangePhoto = () => {
        setIsPhotoChanging(true);
    }

    //загружаем чтобы value было сразу же username. 
    useEffect(() => {
        setValue(user?.username || 'Anonymous');
    }, []);

    if (!user) return <div>No user</div>;

    console.log('value:', value)



    return (
        <div className='flex flex-col items-center gap-5'>

            <header aria-labelledby='profile-heading' className='flex flex-col gap-3'>

                <div className='m-auto w-24 h-24 rounded-full bg-white shadow-md border-2 border-gray-300 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                    <img 
                        src={user?.photoURL ||DEFAULT_URL } 
                        alt={user?.username || 'Anonymous'}
                        className='w-4/5 h-4/5' 
                    />

                </div>

                <form onSubmit={(e) => e.preventDefault()}className='flex flex-col'>

                    <div className='flex gap-1 items-center rounded-md relative'>

                        <input 
                            type='text'
                            value={value}
                            name='username' 
                            onChange={(e) => setValue(e.target.value)}
                            className={`
                                ${isNameChanging? 'border': 'border-none'}
                                border-gray-300 rounded-lg px-2 py-2
                                text-base
                                focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
                                hover:border-gray-400
                                disabled:opacity-80 disabled:text-lg disabled:font-bold
                                placeholder-gray-400
                                transition-all duration-200
                            `}
                            placeholder='Enter your name'
                            disabled={!isNameChanging}
                        />


                        {isNameChanging? (
                            <>

                                <Button
                                    type='submit' 
                                    onClick={handleUpdateUserName}
                                    variant='contained' 
                                    color='success' 
                                    size='medium'
                                    disabled={isLoading}
                                >
                                    {isLoading? 'Saving...' : 'Save'}
                                </Button>

                                <Button
                                    type='button' 
                                    onClick={() => setIsNameChanging(false)} 
                                    variant='text' 
                                    color='warning' 
                                    size='medium'>
                                        Cancel
                                </Button>
                            </>



                        ) : (
                            
                            <button
                                type='button' 
                                className='absolute right-2 cursor-pointer'
                                onClick={handleChangeName}
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
                <form aria-label='Change profile picture' onSubmit={(e) => e.preventDefault()}>
                    
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
                                placeholder-gray-400
                                transition-all duration-200
                            `}
                            placeholder='Past image link here'
                        />

                        <Button
                            type='submit' 
                            onClick={handleUpdateUserName}
                            variant='contained' 
                            color='success' 
                            size='small'
                            disabled={isLoading}
                        >
                            {isLoading? 'Changing...' : 'Change'}
                        </Button>
                        
                        <button
                            type='button'
                            className='
                                p-2 bg-gray-200 rounded-md uppercase text-[13px] cursor-pointer transition
                              hover:bg-gray-300 '
                            onClick={() => setIsPhotoChanging(true)}
                        >
                            {isLoading?'Changing...' : 'Default URL'}
                        
                        </button>


                    </div>

                    {/*<button
                        type='submit' 
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transitioncursor-pointer'
                        onClick={handleUpdateUserPhoto}
                        disabled={isLoading}
                        >
                            {isLoading? 'Saving...' : 'Save'}
                    </button>*/}

                    {/* <button
                    >
                        default image/link?
                    </button> */}

                </form>

            </section>


        </div>
    )
}

export default Settings;