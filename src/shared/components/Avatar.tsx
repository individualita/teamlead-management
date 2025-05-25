import { DEFAULT_URL } from '../constants/defaultImageUrl';

const Avatar = ({src, username}: {src: string | null, username: string | null}) => {
    
    return (
        <img 
            src={src || DEFAULT_URL} 
            alt={`${username || 'User'} image`} 
            className='h-[95%] w-[95%] rounded-full'
            title={`${username}`}
        />
    )
}

export default Avatar;

