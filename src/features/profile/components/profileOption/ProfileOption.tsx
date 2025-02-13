import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../../auth/store/authStore';

import { ROUTE_PATHS } from '../../../../shared/constants/routePaths';


const ProfileOption = () => {

    const { logout } = useAuthStore();
    const navigate = useNavigate();
    
    const handleLogOut = async () => {
        await logout();
        navigate(ROUTE_PATHS.SIGN_IN);
    };

    return (
        <div className='p-4 flex flex-col'>
            {/* navigate to settings */}
            <button className='text-left'>Settings</button>


            <button 
                onClick={handleLogOut} 
                className='cursor-pointer underline text-left' 
                aria-label='Sign out'
            >
                Sign out
            </button>

        </div>
    )
};

export default ProfileOption;