import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';

//types
import { User } from '../types';

interface UserState {
    user: User | null,
    setUser: (payload: User | null) => void,

    isLoading: boolean,
    setLoading: (payload: boolean ) => void,

    errorMessage: string | null,
    setErrorMessage: (payload: string| null) => void,

    isAuthInitialized: boolean,

    listenAuthState: () => () => void;

    logout: () => Promise<void>;

}



export const useAuthStore = create<UserState>((set) => ({

    user: null,
    setUser: (payload) => set({user: payload}),

    isLoading: false,
    setLoading: (payload) => set({isLoading: payload}),

    errorMessage: null,
    setErrorMessage: (payload) => set({errorMessage: payload}),

    isAuthInitialized: false,

    listenAuthState: () =>  {
        set({isLoading: true});

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if (!currentUser) {
                
                set({user:null, isLoading: false, errorMessage: null, isAuthInitialized: true });
                console.log('User is not authenticated or has logged out');
                return;
            }

            try {
                const token = await currentUser.getIdToken();

                set({
                    user: {id: currentUser.uid, username: currentUser.displayName, email: currentUser.email, photoURL: currentUser.photoURL,token},
                    isLoading: false, 
                    errorMessage: null,
                    isAuthInitialized: true,
                });

            } catch(error: unknown) {
                console.error('Error retrieving Firebase token:', error);

                set({user: null, isLoading: false, errorMessage: (error as Error).message, isAuthInitialized: true})
            } 
        });

        return unsubscribe;
    },

    logout: async () => {

        set({isLoading: true});

        try {
            await signOut(auth);
            set({user: null, errorMessage: null});
            console.log('User successfully logged out');

        } catch (error: unknown) {
            set({errorMessage: (error as Error).message});
        } finally {
            set({isLoading: false});
        }
        
    }
}));


