import dayjs from 'dayjs';

import { ChatMessage } from '../../types';

import Avatar from '../../../../shared/components/avatar/Avatar';

interface MessageItemProps {
    currentUserId: string,
    message: ChatMessage,
}
const MessageItem = ({currentUserId, message}: MessageItemProps) => {

    const isMine = message.authorId === currentUserId;
    const formattedTime = dayjs(message.timestamp).format('h:mm A');


    return (

        <li className={`relative flex gap-1 items-center mb-3 ${isMine? 'self-end': 'self-start flex-row-reverse'}`}>
            <div className={`flex flex-col ${isMine? 'items-end': 'items-start'}`}>

                <p className={`py-1 px-3 rounded-xl ${isMine? 'bg-[var(--color-primary)] text-white': 'bg-gray-200 text-black'}`}>{message.text}</p>

                <span className='text-[8px] text-gray-500 absolute top-8 right-1'>
                    {formattedTime}
                </span>

            </div>

            <div className='h-8 w-8'>
                <Avatar 
                    src={message.photoURL} 
                    username={message.name}
                />
            </div>

        </li>

    )

}

export default MessageItem;