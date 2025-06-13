import { Outlet, Navigate } from 'react-router-dom';

import {
    useAuthUser,
    useAuthLoading,
    useAuthInitialized,
} from '../../shared/stores/authStore';

import { LoadingCircle } from '../../shared/components/layouts/loadingCircle/LoadingCircle';

export const PublicRoute = () => {
    const user = useAuthUser();
    const isLoading = useAuthLoading();
    const isAuthInitialized = useAuthInitialized();

    if (!isAuthInitialized || isLoading) return <LoadingCircle />;

    if (user) return <Navigate to='/home' replace />;

    return <Outlet />;
};
