import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import { ROUTE_PATHS } from '../constants/routePaths';

export const PublicRoute = () => {
    const { user, isAuthInitialized} = useAuthStore();

    if (!isAuthInitialized ) return <div>loading...</div>;

    if (user) return <Navigate to={ROUTE_PATHS.HOME} />;

    return <Outlet />;
}