import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

// material UI
import { Alert, Divider } from '@mui/material';

//store
import { useAuthError } from '../../../shared/stores/authStore';

//constants
import { ROUTES } from '../../../shared/constants/routes';
import { VALIDATION_RULES } from '../constants/validationRules';

//components
import ErrorAlert from './ErrorAlert';

//styles
import '../styles/auth.css';

interface AuthInputs {
    username?: string;
    email: string;
    password: string;
}

interface AuthFormProps {
    title: string;
    onFormSubmit: (
        email: string,
        password: string,
        username?: string,
    ) => Promise<void>;
}

const testCredentials = {
    login: 'test@test.com',
    password: 'Test1234',
};

const AuthForm = ({ title, onFormSubmit }: AuthFormProps) => {
    const errorMessage = useAuthError();

    //RHF
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AuthInputs> = async data => {
        await onFormSubmit(data.email, data.password, data.username);
    };

    return (
        <div className='flex justify-center items-center h-dvh'>
            <form
                className=' bg-white p-8 w-full inset-shadow-sm shadow-xl max-w-[450px] rounded-[8px] flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <ErrorAlert errorMessage={errorMessage ?? undefined} />

                <div className='text-primary text-xl font-bold text-center'>
                    Teamlead{' '}
                </div>
                <h1 className='text-2xl md:text-3xl font-bold'>{title}</h1>

                {title === ROUTES.SIGN_UP.title && (
                    <div className='auth-form-group'>
                        <label htmlFor='username' className='auth-label'>
                            Your name
                        </label>

                        <input
                            type='text'
                            id='username'
                            {...register('username', VALIDATION_RULES.USERNAME)}
                            placeholder='Your name'
                            className='auth-input focus-input'
                        />

                        {errors.username && (
                            <span className='auth-error'>
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                )}

                <div className='auth-form-group'>
                    <label htmlFor='email' className='auth-label'>
                        Email
                    </label>

                    <input
                        type='email'
                        id='email'
                        {...register('email', VALIDATION_RULES.EMAIL)}
                        placeholder='your@email.com'
                        className='auth-input focus-input'
                    />
                    {errors.email && (
                        <span className='auth-error'>
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className='auth-form-group'>
                    <label htmlFor='password' className='auth-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        {...register('password', VALIDATION_RULES.PASSWORD)}
                        placeholder='••••••'
                        className='auth-input focus-input'
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className='auth-error'>
                            {' '}
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button
                    type='submit'
                    className='text-xs md:text-sm mt-3 md:mt-6 w-full p-2 text-white font-bold rounded-xl md:rounded-2xl cursor-pointer bg-gray-800 hover-fade'
                >
                    {title.toUpperCase()}
                </button>

                <Divider className='text-[10px] md:text-xs'>or</Divider>
                <p className='text-center text-xs md:text-sm'>
                    {title === ROUTES.SIGN_IN.title
                        ? `Don't have an account?`
                        : 'Already have an account?'}{' '}
                    {''}
                    <Link
                        to={
                            title === ROUTES.SIGN_IN.title
                                ? ROUTES.SIGN_UP.path
                                : ROUTES.SIGN_IN.path
                        }
                        className=' text-secondary hover:md:underline'
                    >
                        {title === ROUTES.SIGN_IN.title
                            ? 'Get started'
                            : 'Sign in'}
                    </Link>
                </p>

                {title === ROUTES.SIGN_IN.title && (
                    <Alert title='Test account' severity='info'>
                        <p className='auth-info'>
                            Login:{' '}
                            <span className='font-bold'>
                                {testCredentials.login}
                            </span>
                        </p>
                        <p className='auth-info'>
                            Password:
                            <span className='font-bold'>
                                {testCredentials.password}
                            </span>
                        </p>
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
