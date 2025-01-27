import AuthForm from "./components/AuthForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "./store/authStore";

import { useNavigate } from "react-router-dom";

import { auth } from './services/firebaseConfig';

import { createUserService } from "./services/createUserService";

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
            navigate('/home');

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unexpected error");
            }

            console.error(error);
            throw error;

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