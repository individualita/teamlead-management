import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

// material UI
import { Alert, Divider } from '@mui/material';

//store
import { useAuthError } from '../../../../shared/stores/authStore';

//constants
import { ROUTES } from '../../../../shared/constants/routes';
import { VALIDATION_RULES } from '../../constants/validationRules';

//components
import ErrorAlert from '../errorAlert/ErrorAlert';

//styles
import styles from './authForm.module.css';

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
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <ErrorAlert errorMessage={errorMessage ?? undefined} />

                <div className={styles.logo}>Teamlead </div>
                <h1 className={styles.title}>{title}</h1>

                {title === ROUTES.SIGN_UP.title && (
                    <div className={styles.formGroup}>
                        <label htmlFor='username' className={styles.label}>
                            Your name
                        </label>

                        <input
                            type='text'
                            id='username'
                            {...register('username', VALIDATION_RULES.USERNAME)}
                            placeholder='Your name'
                            className={styles.input}
                        />

                        {errors.username && (
                            <span className={styles.error}>
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.label}>
                        Email
                    </label>

                    <input
                        type='email'
                        id='email'
                        {...register('email', VALIDATION_RULES.EMAIL)}
                        placeholder='your@email.com'
                        className={styles.input}
                    />
                    {errors.email && (
                        <span className={styles.error}>
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='password' className={styles.label}>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        {...register('password', VALIDATION_RULES.PASSWORD)}
                        placeholder='••••••'
                        className={styles.input}
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className={styles.error}>
                            {' '}
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button type='submit' className={styles.button}>
                    {title.toUpperCase()}
                </button>

                <Divider>or</Divider>
                <p className='text-center'>
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
                        className='text-blue-600'
                    >
                        {title === ROUTES.SIGN_IN.title
                            ? 'Get started'
                            : 'Sign in'}
                    </Link>
                </p>

                {title === ROUTES.SIGN_IN.title && (
                    <Alert title='Test account' severity='info'>
                        <p>
                            Login:{' '}
                            <span className='font-bold'>test@test.com</span>
                        </p>
                        <p>
                            Password:<span className='font-bold'>Test1234</span>
                        </p>
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
