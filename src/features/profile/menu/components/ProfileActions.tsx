import { useNavigate } from 'react-router-dom';

import { logout } from '@/shared/stores/authStore';

import { ROUTES } from '@/shared/constants/routes';

import '../styles/profileMenu.css';

const ProfileActions = () => {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logout();
        navigate(ROUTES.SIGN_IN.path);
    };

    return (
        <div className='p-4 flex flex-col gap-1'>
            {/* navigate to settings */}
            <button
                className='profile-action-button hover-fade'
                onClick={() => navigate(ROUTES.SETTINGS.path)}
            >
                Settings
            </button>

            <button
                onClick={handleLogOut}
                className='profile-action-button hover-fade'
                aria-label='Sign out'
            >
                Sign out
            </button>
        </div>
    );
};

export default ProfileActions;
