//store
import { signIn } from '../../../shared/stores/authStore';

//constants
import { AUTH_TITLES } from '../constants/authTitles';

//components
import AuthForm from '../components/authForm/AuthForm';

const SignIn = () => {
    return (
        <>
            <h1>Sign in page</h1>
            <AuthForm title={AUTH_TITLES.SIGN_IN} onFormSubmit={signIn} />
        </>
    );
};

export default SignIn;
