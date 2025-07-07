import { Outlet, Navigate } from 'react-router-dom';

//store
import { useAuthUser, useAuthLoading, useAuthInitialized } from '@/shared/stores/authStore';

//constants
import { ROUTES } from '@/shared/constants/routes';
//components
import { LoadingCircle } from '@/shared/components/layouts/LoadingCircle';

export const ProtectedRoute = () => {
    const user = useAuthUser();
    const isLoading = useAuthLoading();
    const isAuthInitialized = useAuthInitialized();

    if (!isAuthInitialized || isLoading) return <LoadingCircle />;
    if (!user) return <Navigate to={ROUTES.SIGN_IN.path} replace />;

    return <Outlet />;
};
