import { create } from 'zustand';

interface User {
    id: string | null,
    email: string | null,
    token: string | null,
}

interface UserState {
    user: User,
    setUser: (payload: User) => void,

    loading: boolean,
    setLoading: (payload: boolean ) => void,

    errorMessage: string | null,
    setErrorMessage: (payload: string) => void,
}

export const useAuthStore = create<UserState>((set) => ({

    user: {
        id: null,
        email: null,
        token: null,
    },
    setUser: (payload: User) => set({user: payload}),

    loading: false,
    setLoading: (payload: boolean) => set({loading: payload}),

    errorMessage: null,
    setErrorMessage: (payload: string | null) => set({errorMessage: payload}),

}));


