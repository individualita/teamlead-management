import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom';

// material UI
import Divider from '@mui/material/Divider';

//store
import { useAuthStore } from '../../store/authStore';

//constants
import { ROUTE_PATHS } from '../../../../shared/constants/routePaths';

//components
import ErrorAlert from '../errorAlert/ErrorAlert';

//styles
import styles from './authForm.module.css';



type AuthInputs = {
    email: string,
    password: string,
}

type AuthFormProps = {
    title: string,
    onFormSubmit: (email: string, password: string) => void,
}

const AuthForm = ({title, onFormSubmit} : AuthFormProps) => {

    const {errorMessage} = useAuthStore();

    const { register, handleSubmit, watch, formState: { errors }} = useForm<AuthInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AuthInputs> = (data) => {
        onFormSubmit(data.email, data.password)
    };


    return (
        <div className={styles.formContainer}>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <ErrorAlert errorMessage={errorMessage?? undefined}/> 

                <div className={styles.logo}>Teamlead </div>
                <h1 className={styles.title}>{title}</h1>
                

                <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.label}>Email</label>

                    <input 
                        type='email' 
                        id='email' 
                        {...register('email', {required: true})} 
                        placeholder='your@email.com' 
                        className={styles.input}
                    />
                    {errors.email && <span className={styles.error}>Email is required</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='password' className={styles.label}>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        {...register('password', {required: true})} 
                        placeholder='••••••' 
                        className={styles.input}
                        autoComplete='current-password'
                    />
                    {errors.password && <span className={styles.error}> Password is required</span>}
                </div>



                <button type='submit' className={styles.button}>{title.toUpperCase()}</button>

                <Divider>or</Divider>
                <p className='text-center'>
                    {title === 'Sign in' ? `Don't have an account?` : 'Already have an account?' } {''}

                    <Link to={title === 'Sign in'? ROUTE_PATHS.SIGN_UP : ROUTE_PATHS.SIGN_IN} className='text-blue-600'>
                        {title==='Sign in'? 'Sign Up' : 'Sign in'}
                    </Link>

                </p>
            </form>
        </div>
    )

}

export default AuthForm;