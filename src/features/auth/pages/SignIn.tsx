import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

//config
import { auth } from '../../../shared/config/firebaseConfig';

//store
import { useAuthStore } from '../store/authStore';

//constants 
import { FIREBASE_AUTH_ERRORS } from '../constants/firebaseAuthErrors';
import { ROUTE_PATHS } from '../../../shared/constants/routePaths';
import { AUTH_TITLES } from '../constants/authTitles';

//services
import { executeAuthAction } from '../services/executeAuthAction';

//components 
import AuthForm from '../components/authForm/AuthForm';



const SignIn = () => {

    const { setLoading, setErrorMessage, setUser} = useAuthStore();

    const navigate = useNavigate();

    
    const handleLogin = async (email: string, password: string) => {

        try {
            setErrorMessage('');
            setLoading(true);

            const user = await executeAuthAction(signInWithEmailAndPassword, auth, email, password, undefined);
    
            setUser(user);
            
            navigate(ROUTE_PATHS.HOME);

        } catch (error: any) {
            const firebaseError = FIREBASE_AUTH_ERRORS.get(error.code) || 'An unknown error occurred.';
            setErrorMessage(firebaseError);
            console.error(error);

        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <h1>Sign in page</h1>
            <AuthForm title={AUTH_TITLES.SIGN_IN} onFormSubmit={handleLogin} />

        </>
    )

    
}

export default SignIn;