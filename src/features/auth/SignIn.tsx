import { signInWithEmailAndPassword } from "firebase/auth";
import AuthForm from "./components/AuthForm"
import {auth} from './services/firebaseConfig';
import { useAuthStore } from "./store/authStore";
import { useNavigate } from "react-router-dom";

import { createUserService } from "./services/createUserService";

//test@gmail.com
//Test1234

const SignIn = () => {

    const { setLoading, setErrorMessage, setUser} = useAuthStore();

    const navigate = useNavigate();

    
    const handleLogin = async (email: string, password: string) => {

        try {
            setErrorMessage('');
            setLoading(true);

            const user = await createUserService(signInWithEmailAndPassword, auth, email, password);
    
            setUser(user);
            
            navigate('/home')

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message); // Доступ к свойству message

            } else {
                setErrorMessage("An unexpected error"); // Запасной вариант
            }
            console.error(error);
            throw  error;

        } finally {
            setLoading(false);
        }
    }
    


    return (
        <>
            <h1>Sign in page</h1>
            <AuthForm title={'Sign in'} handleClick={handleLogin} />
        </>
    )

    
}

export default SignIn;