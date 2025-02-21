
//types
import { Auth, UserCredential } from 'firebase/auth';
import { User } from '../types/user';


type AuthActionType =  (auth: Auth, email:string, password:string) => Promise<UserCredential>;

export const executeAuthAction = async (action: AuthActionType, auth: Auth, email:string, password:string): Promise<User> => {
    
    const userCredential = await action(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    return {
        email: user.email,
        id: user.uid,
        token: token
    }
}

