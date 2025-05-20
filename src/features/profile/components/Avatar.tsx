import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';

const Avatar = ({src, username}: {src: string | null, username: string | null}) => {
    
    return (
        <img 
            src={src || DEFAULT_URL} 
            alt={`${username || 'User'} image`} 
            className='h-[95%] w-[95%] rounded-full'
        />
    )
}

export default Avatar;

