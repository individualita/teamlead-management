import dayjs from 'dayjs';

import { ChatMessage } from '../types';

import Avatar from '../../../shared/components/Avatar';

interface MessageItemProps {
    currentUserId: string;
    message: ChatMessage;
}
const MessageItem = ({ currentUserId, message }: MessageItemProps) => {
    const isMine = message.authorId === currentUserId;
    const formattedTime = dayjs(message.timestamp).format('h:mm A');

    return (
        <li
            className={` max-w-90 break-words flex gap-1 items-center mb-3 ${isMine ? 'self-end' : 'self-start flex-row-reverse'}`}
        >
            <div
                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
            >
                <p
                    className={`py-1 px-3 rounded-xl ${isMine ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
                >
                    {message.text}
                </p>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='h-8 w-8'>
                    <Avatar src={message.photoURL} username={message.name} />
                </div>
                <span className={`text-[6px] text-gray-500`}>
                    {formattedTime}
                </span>
            </div>
        </li>
    );
};

export default MessageItem;
