import { Outlet, Navigate } from 'react-router-dom';
//store
import { useAuthStore } from '../stores/authStore';

import { LoadingCircle } from '../components/layouts/loadingCircle/LoadingCircle';


export const PublicRoute = () => {
    const { user, isAuthInitialized, isLoading} = useAuthStore();

    if (!isAuthInitialized || isLoading ) return <LoadingCircle />;

    if (user) return <Navigate to='/home' replace />;

    return <Outlet />;
}