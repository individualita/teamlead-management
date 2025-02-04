import { Outlet, Navigate } from 'react-router-dom';
//store
import { useAuthStore } from '../../features/auth/store/authStore';
//constants
import { ROUTE_PATHS } from '../constants/routePaths';

import { LoadingCircle } from '../components/LoadingCircle';


export const PublicRoute = () => {
    const { user, isAuthInitialized, isLoading} = useAuthStore();

    if (!isAuthInitialized || isLoading ) return <LoadingCircle />;

    if (user) return <Navigate to={ROUTE_PATHS.HOME} />;

    return <Outlet />;
}