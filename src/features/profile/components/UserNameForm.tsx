import { useState, FormEvent } from 'react';
import { Button } from '@mui/material';

import { updateProfile } from 'firebase/auth';
import { useAuthStore } from '../../auth/store/authStore';

import { FaPencil } from 'react-icons/fa6';

import { auth } from '../../../shared/config/firebaseConfig';

interface EditUserNameFormProps {
    handleSubmit: () => Promise<void>
}
// const UserNameForm = ({handleSubmit}: EditUserNameFormProps) => {

//     const [name, setName] = useState('');
//     const [isNameUpdating, setIsNameUpdating] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     const { user, setUser } = useAuthStore();


//     const handleUpdateUserName = async (e: FormEvent) => {

//         e.preventDefault();

//         if (!user) return;

//         setIsLoading(true);

//         try {
//             await updateProfile(auth.currentUser!, {
//                 displayName: name,
//             })

//             // Вручную обновляем Zustand-стор, так как onAuthStateChanged не срабатывает
//             setUser({
//                 ...user,
//                 username: name,
//             });
//             setName(name);

//         } catch (error) {
//             console.error('Failed to update profile:', error);
//             throw error;
//         } finally {
//             setIsLoading(false);
//             setIsNameUpdating(false);

//         }

//     };

//     if (!user) return <div>No user</div>;


//     return (

//         <form 
//             onSubmit={handleSubmit} 
//             className='flex flex-col'
//         >
//             <div className='flex gap-3 items-center rounded-md relative'>

//                 <input 
//                     type='text'
//                     value={name}
//                     name='username' 
//                     onChange={(e) => setName(e.target.value)}
//                     className={`
//                         ${isNameUpdating? 'border': 'border-none'}
//                         border-gray-300 rounded-lg px-2 py-2
//                         text-base
//                         focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
//                         hover:border-gray-400
//                         disabled:opacity-80 disabled:text-lg disabled:font-bold
//                         placeholder-gray-400 
//                         transition-all duration-200
//                     `}
//                     placeholder='Enter your name'
//                     disabled={!isNameUpdating}
//                     required
//                 />


//                 {isNameUpdating? (
//                     <div className='flex gap-3'>

//                         <Button
//                             type='submit' 
//                             variant='contained' 
//                             color='success' 
//                             size='medium'
//                             disabled={isLoading}
//                         >
//                             {isLoading && !isPhotoUpdating? 'Saving...' : 'Save'}
//                         </Button>

//                         <Button
//                             type='button' 
//                             onClick={() => {
//                                 setIsNameUpdating(false);
//                                 setName(user.username || '')
//                             }} 
//                             variant='text' 
//                             color='warning' 
//                             size='medium'
//                         >
//                                 Cancel
//                         </Button>
//                     </div>

//                 ) : (
                    
//                     <button
//                         type='button' 
//                         className='absolute right-2 cursor-pointer'
//                         onClick={() => setIsNameUpdating(true)}
//                     >
//                         <FaPencil 
//                             className='text-base'
//                             title='Edit name'
//                         /> 
//                     </button>

//                 )}


//             </div>

//         </form>
//     )

// }

// export default UserNameForm;