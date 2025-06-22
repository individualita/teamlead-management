//store
import { signIn } from '../../../shared/stores/authStore';

//constants
import { ROUTES } from '../../../shared/constants/routes';

//components
import AuthForm from '../components/authForm/AuthForm';

const SignIn = () => {
    return (
        <AuthForm title={ROUTES.SIGN_IN.title} onFormSubmit={signIn} />
    );
};

export default SignIn;
