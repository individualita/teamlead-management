import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/authForm/AuthForm";
import {auth} from '../../../shared/config/firebaseConfig';
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "../../../shared/constants/routePaths";


import { FIREBASE_AUTH_ERRORS } from "../constants/firebaseAuthErrors";
import { executeAuthAction } from "../services/executeAuthAction";

//test@gmail.com
//Test1234

const SignIn = () => {

    const { setLoading, setErrorMessage, setUser} = useAuthStore();

    const navigate = useNavigate();

    
    const handleLogin = async (email: string, password: string) => {

        try {
            setErrorMessage('');
            setLoading(true);

            const user = await executeAuthAction(signInWithEmailAndPassword, auth, email, password);
    
            setUser(user);
            
            navigate(ROUTE_PATHS.HOME);

        } catch (error: any) {
            const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || "An unknown error occurred.";
            setErrorMessage(firebaseError);
            console.error(error);

        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <h1>Sign in page</h1>
            <AuthForm title={'Sign in'} onFormSubmit={handleLogin} />
        </>
    )

    
}

export default SignIn;