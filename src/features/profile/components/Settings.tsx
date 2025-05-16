import { useState } from 'react';
import { useAuthStore } from '../../auth/store/authStore';

import { FaPencil } from 'react-icons/fa6';

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

    const updateUserName = async () => {

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

    const updateUserPhoto = async () => {

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


    if (!user) return <div>No user</div>;

    return (
        <div>
            <h1>change picture </h1>

            
            <div className='flex flex-col justify-center text-center'>

                <div className='m-auto w-24 h-24 rounded-full bg-white shadow-md border-2 border-gray-300 hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                    <img 
                        src={user?.photoURL ||DEFAULT_URL } 
                        alt={user?.username || 'Anonymous'}
                        className='w-4/5 h-4/5' 
                    />

                </div>

                <span>{user?.username || 'Anonymous'}</span>

                <div className='flex gap-3 justify-center mt-10'>


                    <button 
                        className='border border-gray-600 bg-white p-2 cursor-pointer rounded-md'
                        onClick={handleChangeName}
                    >
                        Change name
                    </button>

                    <button
                        className='border border-gray-600 bg-gray-200 p-2 cursor-pointer rounded-md '
                        onClick={() => setIsPhotoChanging(true)}
                    >
                        Change picture
                    
                    </button>

                    <button className='border bg-red-400 p-2 cursor-pointer rounded-md'>Delete account</button>


                </div>
  

            </div>



            
            {/*<div className='flex flex-col mt-6'>

                <div className='flex gap-7'>
                    <p>Change username</p>
                    <p>{user?.username || 'Anonymous'}</p>
                    <button className='cursor-pointer'><FaPencil /> </button>
                </div>

                <div className='flex gap-7'>
                    <p>Picture</p>
                    <p>{user?.username || 'Anonymous'}</p>
                    <button className='cursor-pointer'><FaPencil /> </button>
                </div>


        
            </div>*/}






            <br />
            <button
                className='border border-gray-600 bg-gray-200 p-2 cursor-pointer rounded-md'
                onClick={() => setIsPhotoChanging(true)}
            >
                Change picture
                
            </button>
            <button onClick={() => setIsPhotoChanging(false)}>Cancel</button>
            <br />

            <div>value: {value}</div>

            {isNameChanging && (

                <div className='border border-amber-900'>

                    <input 
                        type='text'
                        value={value}
                        name='username' 
                        onChange={(e) => setValue(e.target.value)}
                        className='border border-amber-950' 
                        placeholder='Enter your name'
                    />
                    <button 
                        className='bg-green-300 p-2 cursor-pointer'
                        onClick={updateUserName}
                        disabled={isLoading}
                        >
                            {isLoading? 'Saving...' : 'Save'}
                    </button>

                </div>
            )}

            {isPhotoChanging && (

                <div className='border border-amber-300'>

                    <input 
                        type='text'
                        value={photoURL} 
                        name='photourl'
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className='border border-amber-950 p-1' 
                        placeholder='Past image link here'
                    />

                    <button 
                        className='bg-green-300 p-2 cursor-pointer'
                        onClick={updateUserPhoto}
                        disabled={isLoading}
                        >
                            {isLoading? 'Saving...' : 'Save'}
                    </button>

                </div>

            )}
            

        
            <br />
            <br />
            <button>go back!</button>
        </div>
    )
}

export default Settings;