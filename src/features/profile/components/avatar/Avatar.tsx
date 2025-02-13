const Avatar = ({src}: {src: string}) => {
    return (
        <img src={src || 'default avatar tut'} alt='avatar image' className='rounded-full'/>
    )
}

export default Avatar;