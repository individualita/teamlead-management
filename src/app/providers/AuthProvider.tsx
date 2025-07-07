import { ReactNode, useEffect } from 'react';

import { useListenAuthState } from '@/shared/stores/authStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const listenAuthState = useListenAuthState();

    useEffect(() => {
        const unsubscribe = listenAuthState();

        return () => unsubscribe();
    }, [listenAuthState]);

    return <>{children}</>;
};
