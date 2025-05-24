import { useState } from 'react';
import { updateProfile } from 'firebase/auth';

import { auth } from '../../../../shared/config/firebaseConfig';
import { useAuthStore } from '../../../auth/store/authStore';

interface ProfileFields {
    displayName?: string
    photoURL?: string
}

export const useFirebaseProfileUpdate = (): {
    isLoading: boolean,
    update: (payload: ProfileFields) => Promise<void>
} => {

    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useAuthStore();

    const update = async (payload:ProfileFields ) => {
        if (!user) return;

        setIsLoading(true);

        try {
            await updateProfile(auth.currentUser!, payload)

            // Вручную обновляем Zustand-стор, так как onAuthStateChanged не срабатывает
            setUser({
                ...user,
                username: payload.displayName?? user.username,
                photoURL: payload.photoURL?? user.photoURL
            });


        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }

    };

    return {isLoading, update}

}






