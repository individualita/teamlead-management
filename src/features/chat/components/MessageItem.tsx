import dayjs from 'dayjs';

import { ChatMessage } from '../types';

import Avatar from '../../../shared/components/Avatar';

interface MessageItemProps {
    currentUserId: string,
    message: ChatMessage,
}
const MessageItem = ({currentUserId, message}: MessageItemProps) => {

    const isMine = message.authorId === currentUserId;

    return (

        <li className={`flex gap-1 items-center mb-3 ${isMine? 'self-end': 'self-start flex-row-reverse'}`}>
            <div className={`flex flex-col relative ${isMine? 'items-end': 'items-start'}`}>

                <p className={`p-3 rounded-xl ${isMine? 'bg-[var(--color-primary)] text-white': 'bg-gray-200 text-black'}`}>{message.text}</p>

                <span className='text-[9px] text-gray-500 absolute -bottom-4'>
                    {dayjs(message.timestamp).format('h:mm A')}
                </span>

            </div>

            <div className='h-8 w-8'>
                <Avatar src={message.photoURL} username={message.name}/>
            </div>

        </li>

    )

}

export default MessageItem;