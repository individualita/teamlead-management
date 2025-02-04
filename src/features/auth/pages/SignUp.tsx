import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//config
import { auth } from '../../../shared/config/firebaseConfig';

//store
import { useAuthStore } from '../store/authStore';

//constants
import { FIREBASE_AUTH_ERRORS } from '../constants/firebaseAuthErrors';
import { ROUTE_PATHS } from '../../../shared/constants/routePaths';

//services
import { executeAuthAction } from '../services/executeAuthAction';

//components
import AuthForm from '../components/authForm/AuthForm';


const SignUp = () => {

    const { setLoading, setErrorMessage, setUser} = useAuthStore();


    const navigate = useNavigate();



    const handleRegister = async (email: string, password: string) => {
        try {
            setErrorMessage('');
            setLoading(true);

            const user = await executeAuthAction(createUserWithEmailAndPassword, auth, email, password);
  
            setUser(user);

            console.log('register success!')
            navigate(ROUTE_PATHS.HOME);

        } catch (error: any) {
            const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || 'An unknown error occurred.';
            setErrorMessage(firebaseError);
            console.error(error);

        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <h1>Sign Up page!</h1>

            <AuthForm title={'Sign Up'} onFormSubmit={handleRegister} /> 
        </>
    )
}

export default SignUp;