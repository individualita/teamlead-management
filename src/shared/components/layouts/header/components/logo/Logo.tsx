import appLogo from '../../assets/applogo.svg';

const Logo = () => {
    return (
        <div className='flex gap-2 items-center w-[260px] px-2'>
            <img src={appLogo} alt='Teamlead logo' className='w-9 h-9'/>
            <h3 className='text-xl  font-bold'>Teamlead.</h3>
        </div>
    )
}

export default Logo;