import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom';

// material UI
import Divider from '@mui/material/Divider';

//styles
import styles from './authForm.module.css';


type AuthInputs = {
    email: string,
    password: string,
}

type AuthFormProps = {
    title: string,
    handleClick: (email: string, password: string) => void,
}

const AuthForm = ({title, handleClick} : AuthFormProps) => {

    const { register, handleSubmit, watch, formState: { errors }} = useForm<AuthInputs>({
        mode: 'onChange',
    });

    const onSubmit: SubmitHandler<AuthInputs> = (data) => {
        handleClick(data.email, data.password)
    };



    console.log(errors);
    return (

        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

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
                    {errors.email && <span>Email is required</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='password' className={styles.label}>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        {...register('password', {required: true})} 
                        placeholder='••••••' 
                        className={styles.input}
                    />
                    {errors.password && <span> Password is required</span>}
                </div>



                <button type='submit' className={styles.button}>{title.toUpperCase()}</button>
                <Divider>or</Divider>
                <p className='text-center'>Don&apos;t have an account? <a href='#' className='text-blue-600'>Sign up</a></p>
                {/*link react router to sign up */}
            </form>
        </div>
        
    )

}

export default AuthForm;