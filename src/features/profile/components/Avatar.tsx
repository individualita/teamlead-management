const Avatar = ({src}: {src?: string}) => {

    const DEFAULT_URL = 'https://cdn-icons-png.flaticon.com/512/9131/9131478.png';

    return (
        <img src={src || DEFAULT_URL} alt='avatar image' className='rounded-full w-3/4 h-3/4'/>
    )
}

export default Avatar;