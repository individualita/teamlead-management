
// import { useAuthStore } from '../../../shared/stores/authStore';
import { useAuthUser } from '../../../shared/stores/authStore';

import Avatar from '../../../shared/components/avatar/Avatar';

import UserNameForm from './components/userNameForm/UserNameForm';

import UserPhotoForm from './components/userPhotoForm/UserPhotoForm';


const ProfileSettings = () => {

    const user = useAuthUser();

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

            <section aria-labelledby='photo-section-heading' className='flex'>
                <UserPhotoForm />
            </section> 

        </div>
    )
}

export default ProfileSettings;