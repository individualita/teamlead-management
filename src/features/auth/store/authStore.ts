import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from './../../../shared/config/firebaseConfig';

//types
import { User } from '../types/types';


interface UserState {
    user: User | null,
    setUser: (payload: User | null) => void,

    loading: boolean,
    setLoading: (payload: boolean ) => void,

    errorMessage: string | null,
    setErrorMessage: (payload: string| null) => void,

    authInitialized: boolean,

    listenAuthState: () => () => void;

    logout: () => Promise<void>;

}



export const useAuthStore = create<UserState>((set) => ({

    user: null,
    setUser: (payload) => set({user: payload}),

    loading: false,
    setLoading: (payload) => set({loading: payload}),

    errorMessage: null,
    setErrorMessage: (payload) => set({errorMessage: payload}),

    authInitialized: false,

    listenAuthState: () =>  {
        set({loading: true});

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if (!currentUser) {
                
                set({user:null, loading: false, errorMessage: null, authInitialized: true });
                console.log("User is not authenticated or has logged out");
                return;
            }

            try {
                const token = await currentUser.getIdToken();

                set({
                    user: {id: currentUser.uid, email: currentUser.email, token},
                    loading: false, 
                    errorMessage: null,
                    authInitialized: true,
                });

            } catch(error: unknown) {
                console.error("Error retrieving Firebase token:", error);

                set({user: null, loading: false, errorMessage: (error as Error).message, authInitialized: true})
            } 
        });

        return unsubscribe;
    },

    logout: async () => {

        set({loading: true});

        try {
            await signOut(auth);
            set({user: null, errorMessage: null});
            console.log("User successfully logged out");

        } catch (error: unknown) {
            set({errorMessage: (error as Error).message});
        } finally {
            set({loading: false});
        }
        
    }
}));


