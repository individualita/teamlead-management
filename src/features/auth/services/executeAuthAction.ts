import { Auth, updateProfile } from 'firebase/auth';

//types
import { User } from '../../../shared/types';
import { AuthActionType } from '../../../shared/types';

//constants
import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';


export const executeAuthAction = async (
    action: AuthActionType,
    auth: Auth,
    email: string,
    password: string,
    username?: string,
): Promise<User> => {
    try {
        const userCredential = await action(auth, email, password);
        const user = userCredential.user;

        if (username) {
            await updateProfile(user, {
                displayName: username,
                photoURL: DEFAULT_URL,
            });
        }
        const token = await user.getIdToken();

        return {
            username: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            id: user.uid,
            token: token,
        };
    } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
    }
};
