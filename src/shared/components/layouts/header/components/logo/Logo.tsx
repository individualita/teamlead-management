import appLogo from '../../assets/applogo.svg';

const Logo = () => {
    return (
        <div className='flex gap-2 items-center mr-auto px-2'>
            <img src={appLogo} alt='Teamlead logo' className='w-7 md:w-9'/>
            <h3 className='text-base md:text-xl font-bold'>Teamlead.</h3>
        </div>
    )
}

export default Logo;