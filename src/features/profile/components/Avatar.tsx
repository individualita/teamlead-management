import { DEFAULT_URL } from '../../../shared/constants/defaultImageUrl';

const Avatar = ({src, username}: {src: string | null, username: string | null}) => {

    return (
        <img src={src || DEFAULT_URL} alt={`${username || 'User'} image`} className='rounded-full w-3/4 h-3/4'/>
    )
}

export default Avatar;