import { create } from 'zustand';

import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './../../../shared/config/firebaseConfig';

//types
import { User } from '../types/types';

interface UserState {
    user: User | null,
    setUser: (payload: User | null) => void,

    loading: boolean,
    setLoading: (payload: boolean ) => void,

    errorMessage: string | null,
    setErrorMessage: (payload: string) => void,

    listenAuthState: () => void;
}

export const useAuthStore = create<UserState>((set) => ({

    user: null,
    setUser: (payload) => set({user: payload}),

    loading: false,
    setLoading: (payload) => set({loading: payload}),

    errorMessage: null,
    setErrorMessage: (payload) => set({errorMessage: payload}),

    listenAuthState: () =>  {
        set({loading: true});

        
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if (!currentUser) {
                set({user: null, loading: false, errorMessage: null });
                console.log("User is not authenticated or has logged out");
                return;
            }

            try {
                const token = await currentUser.getIdToken();

                set({
                    user: {id: currentUser.uid, email: currentUser.email, token},
                    loading: false, 
                    errorMessage: null,
                });

            } catch(error: unknown) {
                console.error("Error retrieving Firebase token:", error);

                set({user: null, loading: false, errorMessage: (error as Error).message})
                return;
            } 
        });

        return unsubscribe;
    }

}));


