import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom';

// material UI
import { Alert, Divider } from '@mui/material';


//store
import { useAuthStore } from '../../../../shared/stores/authStore';

//constants
import { ROUTE_PATHS } from '../../../../shared/constants/routePaths';
import { AUTH_TITLES } from '../../constants/authTitles';
import { VALIDATION_RULES } from '../../constants/validationRules';

//components
import ErrorAlert from '../errorAlert/ErrorAlert';

//styles
import styles from './authForm.module.css';



interface AuthInputs  {
    username?: string,
    email: string,
    password: string,
}

interface AuthFormProps {
    title: string,
    onFormSubmit: (email: string, password: string, username?: string) => void,
}

const AuthForm = ({title, onFormSubmit} : AuthFormProps) => {

    const {errorMessage} = useAuthStore();

    const { register, handleSubmit,  formState: { errors }} = useForm<AuthInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AuthInputs> = (data) => {
        onFormSubmit(data.email, data.password, data.username)
    };


    return (
        <div className={styles.formContainer}>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <ErrorAlert errorMessage={errorMessage?? undefined}/> 

                <div className={styles.logo}>Teamlead </div>
                <h1 className={styles.title}>{title}</h1>

                {title === AUTH_TITLES.SIGN_UP && (
                    <div className={styles.formGroup}>
                        <label htmlFor='username' className={styles.label}>Your name</label>

                        <input 
                            type='text' 
                            id='username' 
                            {...register('username', VALIDATION_RULES.USERNAME)} 
                            placeholder='Your name' 
                            className={styles.input}
                        />
                        
                        {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                    </div>

                )}

                

                <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.label}>Email</label>

                    <input 
                        type='email' 
                        id='email' 
                        {...register('email', VALIDATION_RULES.EMAIL)} 
                        placeholder='your@email.com' 
                        className={styles.input}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='password' className={styles.label}>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        {...register('password', VALIDATION_RULES.PASSWORD)} 
                        placeholder='••••••' 
                        className={styles.input}
                        autoComplete='current-password'
                    />
                    {errors.password && <span className={styles.error}> {errors.password.message}</span>}
                </div>



                <button 
                    type='submit' 
                    className={styles.button}>
                        {title.toUpperCase()}
                </button>

                <Divider>or</Divider>
                <p className='text-center'>
                    {title === AUTH_TITLES.SIGN_IN? `Don't have an account?` : 'Already have an account?' } {''}

                    <Link to={title === AUTH_TITLES.SIGN_IN? ROUTE_PATHS.SIGN_UP : ROUTE_PATHS.SIGN_IN} className='text-blue-600'>
                        {title=== AUTH_TITLES.SIGN_IN? 'Get started' : 'Sign in'}
                    </Link>

                </p>

                {title === AUTH_TITLES.SIGN_IN && (
                    <Alert 
                        title='Test account' 
                        severity='info'
                    >
                        <p>Login: <span className='font-bold'>test@test.com</span></p>
                        <p>Password:<span className='font-bold'>Test1234</span></p>
                    </Alert>
                )}
            </form>

        </div>
    )

}

export default AuthForm;