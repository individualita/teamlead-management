import { useState } from 'react';

import styles from './authForm.module.css';

import { Link } from 'react-router-dom';

// material UI
import Divider from '@mui/material/Divider';




const AuthForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    return (

        <div className={styles.container}>
            <form className={styles.form}>

                <div className={styles.logo}>Teamlead </div>
                <h1 className={styles.title}>Sign in</h1>

                <label htmlFor='email' className={styles.label}>Email</label>
                <input
                    id='email'
                    type='email'
                    placeholder='your@email.com'
                    className={styles.input}
                    required
                />

                <label htmlFor='password' className={styles.label}>Password</label>
                <input
                    id='password'
                    type='password'
                    placeholder='••••••'
                    className={styles.input}
                    required
                />

                <button type='submit' className={styles.button}>SIGN IN</button>
                <Divider>or</Divider>
                <p className='text-center'>Don&apos;t have an account? <a href='#' className='text-blue-600'>Sign up</a></p>
                {/*link react router to sign up */}
            </form>
        </div>
        
    )

}

export default AuthForm;