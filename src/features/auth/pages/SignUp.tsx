//store
import { signUp } from '../../../shared/stores/authStore';

import { AUTH_TITLES } from '../constants/authTitles';

//components
import AuthForm from '../components/authForm/AuthForm';

const SignUp = () => {
    return (
        <>
            <h1>Sign Up page!</h1>

            <AuthForm title={AUTH_TITLES.SIGN_UP} onFormSubmit={signUp} />
        </>
    );
};

export default SignUp;
