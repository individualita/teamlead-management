import { Outlet, Navigate } from 'react-router-dom'
import { ROUTE_PATHS } from '../constants/routePaths';

import { useAuthStore } from '../../features/auth/store/authStore';

import { LoadingCircle } from '../components/LoadingCircle';

export const ProtectedRoute = () => {
    const {isLoading, user, isAuthInitialized } = useAuthStore();

    if (!isAuthInitialized || isLoading) return <LoadingCircle />;
    if(!user) return <Navigate to={ROUTE_PATHS.SIGN_IN} /> ;

    return <Outlet />;
};

