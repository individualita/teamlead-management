import appLogo from '../../assets/applogo.svg';

import styles from './logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logoWrapper}>
            <img src={appLogo} alt='Teamlead logo' className='w-9 h-9'/>
            <h3 className='text-xl  font-bold'>Teamlead.</h3>
        </div>
    )
}

export default Logo;