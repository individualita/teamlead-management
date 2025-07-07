import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setErrorMessage } from '@/shared/stores/authStore';

export const ErrorResetter = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        setErrorMessage(null);
    }, [pathname]);

    return null;
};
