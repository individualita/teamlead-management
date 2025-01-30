import AuthForm from "../components/authForm/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "../store/authStore";

import { useNavigate } from "react-router-dom";

import {auth} from '../../../shared/config/firebaseConfig';

import { FIREBASE_AUTH_ERRORS } from "../constants/firebaseAuthErrors";
import { ROUTE_PATHS } from "../../../shared/constants/routePaths";

import { createUserService } from "../services/createUserService";

const SignUp = () => {

    const {user, setLoading, setErrorMessage, setUser} = useAuthStore();
    console.log(user);


    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string) => {
        try {
            setErrorMessage('');
            setLoading(true);

            const user = await createUserService(createUserWithEmailAndPassword, auth, email, password);
  
            setUser(user);

            console.log('register success!')
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
            <h1>Sign Up page!</h1>

            <AuthForm title={'Sign Up'} handleClick={handleRegister} /> 
        </>
    )
}

export default SignUp;