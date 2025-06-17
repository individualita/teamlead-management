//store
import { signIn } from '../../../shared/stores/authStore';

//constants
import { ROUTES } from '../../../shared/constants/routes';

//components
import AuthForm from '../components/authForm/AuthForm';

const SignIn = () => {
    return (
        <>
            <h1>Sign in page</h1>
            <AuthForm title={ROUTES.SIGN_IN.title} onFormSubmit={signIn} />
        </>
    );
};

export default SignIn;
