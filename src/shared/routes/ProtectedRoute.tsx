import { Outlet, Navigate } from 'react-router-dom';

//store
import {
    useAuthUser,
    useAuthLoading,
    useAuthInitialized,
} from '../stores/authStore';

//constants
import { ROUTE_PATHS } from '../constants/routePaths';

//components
import { LoadingCircle } from '../components/layouts/loadingCircle/LoadingCircle';

export const ProtectedRoute = () => {
    const user = useAuthUser();
    const isLoading = useAuthLoading();
    const isAuthInitialized = useAuthInitialized();

    if (!isAuthInitialized || isLoading) return <LoadingCircle />;
    if (!user) return <Navigate to={ROUTE_PATHS.SIGN_IN} replace />;

    return <Outlet />;
};
