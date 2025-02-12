import { Outlet, Navigate } from 'react-router-dom'

//store
import { useAuthStore } from '../../features/auth/store/authStore';
//constants 
import { ROUTE_PATHS } from '../constants/routePaths';

//components
import { LoadingCircle } from '../components/LoadingCircle';

export const ProtectedRoute = () => {
    const {isLoading, user, isAuthInitialized } = useAuthStore();

    if (!isAuthInitialized || isLoading) return <LoadingCircle />;
    if(!user) return <Navigate to={ROUTE_PATHS.SIGN_IN} replace /> ;

    return <Outlet />;
};

