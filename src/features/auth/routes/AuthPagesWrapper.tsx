import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { setErrorMessage } from '../../../shared/stores/authStore';

export const AuthPagesWrapper = () => {
    const { pathname } = useLocation();

    // Clear message errors when changing routes
    useEffect(() => {
        setErrorMessage(null);
    }, [pathname]);

    return <Outlet />;
};
