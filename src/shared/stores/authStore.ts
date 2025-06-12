import { create, StateCreator } from 'zustand';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebaseConfig';

//types
import { FirebaseError } from 'firebase/app';
import { User } from '../types';
import { AuthActionType } from '../../features/auth/types';

import { executeAuthAction } from '../../features/auth/services/executeAuthAction';

import { FIREBASE_AUTH_ERRORS } from '../../features/auth/constants/firebaseAuthErrors';


interface UserInitialState {
    user: User | null,
    isLoading: boolean;
    errorMessage: string | null;
    isAuthInitialized: boolean;
}

interface UserActions {
    setUser: (payload: User | null) => void;
    setLoading: (payload: boolean) => void;
    setErrorMessage: (payload: string | null) => void;
}


interface AuthServices {
    listenAuthState: () => () => void;

    logout: () => Promise<void>;

    handleAuthAction: (
        action: AuthActionType,
        email: string,
        password: string,
        username?: string,
    ) => Promise<void>,
}
interface UserState extends UserInitialState, UserActions , AuthServices {}

const authStore: StateCreator<UserState> = ((set) => ({

    user: null,
    setUser: (payload) => set({user: payload}),

    isLoading: false,
    setLoading: (payload) => set({isLoading: payload}),

    errorMessage: null,
    setErrorMessage: (payload) => set({errorMessage: payload}),

    isAuthInitialized: false,

    listenAuthState: () =>  {
        set({isLoading: true});

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

            if (!firebaseUser) {
                
                set({user:null, isLoading: false, errorMessage: null, isAuthInitialized: true });
                console.log('User is not authenticated or has logged out');
                return;
            }

            try {
                const token = await firebaseUser.getIdToken();

                set({
                    user: {id: firebaseUser.uid, username: firebaseUser.displayName, email: firebaseUser.email, photoURL: firebaseUser.photoURL,token},
                    isLoading: false, 
                    errorMessage: null,
                    isAuthInitialized: true,
                });

            } catch(error: unknown) {
                if (error instanceof FirebaseError) {
                    const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || 'An unknown error occurred.';
                    set({user: null, isLoading: false, errorMessage: firebaseError, isAuthInitialized: true})


                } else {
                    set({user: null, isLoading: false, errorMessage: 'An unexpected error occurred.', isAuthInitialized: true})
                    console.error('Non-Firebase error:', error);  
                }
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
            if (error instanceof FirebaseError) {
                const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || 'An unknown error occurred.';
                set({errorMessage: firebaseError})
            } else {
                set({errorMessage: 'An unexpected error occurred.'})
                console.error('Non-Firebase error:', error);  
            }
            throw error;
        } finally {
            set({isLoading: false});
        }
        
    },

    handleAuthAction: async (
        action,
        email,
        password,
        username
    ) => {
        try {
            set({errorMessage: null, isLoading: true})

            const user = await executeAuthAction(
                action,
                auth,
                email,
                password,
                username,
            );

            set({user})

            console.log('try sucess');
            // navigate(ROUTE_PATHS.HOME);

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || 'An unknown error occurred.';
                set({errorMessage: firebaseError})
                console.error(error);
            } else {
                //no firebase error
                set({errorMessage: 'An unexpected error occurred.'})
                console.error('Non-Firebase error:', error);
            }
            throw error;
        } finally {
            set({isLoading: false})
        }
    },

}));


const useAuthStore = create<UserState>()(authStore);


// Optimized selectors
export const useAuthUser = () => useAuthStore(state => state.user);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthInitialized = () => useAuthStore(state => state.isAuthInitialized);
export const useAuthError = () => useAuthStore(state => state.errorMessage);
export const useListenAuthState = () => useAuthStore(state => state.listenAuthState);

// action creators
export const setUser = (user: User | null) => useAuthStore.getState().setUser(user);
export const setErrorMessage = (payload: string | null) => useAuthStore.getState().setErrorMessage(payload);
export const signIn = (email: string, password: string) => {
    return useAuthStore.getState().handleAuthAction(signInWithEmailAndPassword, email, password);
};
export const signUp = (email: string, password: string, username?: string) => {
    return useAuthStore.getState().handleAuthAction(createUserWithEmailAndPassword, email, password, username);
};
export const logout = () => useAuthStore.getState().logout();
