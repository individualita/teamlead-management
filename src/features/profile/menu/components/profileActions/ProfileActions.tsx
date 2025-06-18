import { useNavigate } from 'react-router-dom';

import { logout } from '../../../../../shared/stores/authStore';

// import { ROUTE_PATHS } from '../../../../app/constants/routePaths';
import { ROUTES } from '../../../../../shared/constants/routes';

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
                className='cursor-pointer underline text-left hover:opacity-85 transition-opacity delay-100'
                onClick={() => navigate(ROUTES.SETTINGS.path)}
            >
                Settings
            </button>

            <button
                onClick={handleLogOut}
                className='cursor-pointer underline text-left hover:opacity-85 transition-opacity delay-100'
                aria-label='Sign out'
            >
                Sign out
            </button>
        </div>
    );
};

export default ProfileActions;
