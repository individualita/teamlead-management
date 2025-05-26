import { User } from '../../auth/types/user';
import { Message } from '../hooks/useMessages';

import Avatar from '../../../shared/components/Avatar';

interface MessageItemProps {
    user: User,
    message: Message,
}
const MessageItem = ({user, message}: MessageItemProps) => {


    return (

        <div className={`flex gap-1 items-center mt-3 ${user?.id === message.id? 'self-end': 'self-start flex-row-reverse'}`}>

            <div className={`flex flex-col relative ${user?.id === message.id? 'items-end': 'items-start'}`}>

                <p className={`p-3 rounded-xl ${user?.id === message.id? 'bg-blue-500 text-white': 'bg-gray-200 text-black'}`}>{message.text}</p>

                <span className='text-[9px] text-gray-500 absolute -bottom-4'>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </span>

            </div>

            <div className='h-8 w-8'>
                <Avatar src={message.photoURL} username={message.name}/>
            </div>


        </div>

    )

}

export default MessageItem;