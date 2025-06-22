//store
import { signUp } from '../../../shared/stores/authStore';

//constants
import { ROUTES } from '../../../shared/constants/routes';

//components
import AuthForm from '../components/authForm/AuthForm';

const SignUp = () => {
    return (
        <AuthForm title={ROUTES.SIGN_UP.title} onFormSubmit={signUp} />
    );
};

export default SignUp;
