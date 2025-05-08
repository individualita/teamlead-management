
//types
import { Auth, UserCredential, updateProfile } from 'firebase/auth';
import { User } from '../types/user';


type AuthActionType =  (auth: Auth, email:string, password:string) => Promise<UserCredential>;

export const executeAuthAction = async (action: AuthActionType, auth: Auth, email:string, password:string, username?: string): Promise<User> => {
    
    const userCredential = await action(auth, email, password);
    const user = userCredential.user;

    if (username) {
        await updateProfile(user, {
            displayName: username,
        });
    }
    const token = await user.getIdToken();

    return {
        username: user.displayName,
        email: user.email,
        id: user.uid,
        token: token
    }
}

