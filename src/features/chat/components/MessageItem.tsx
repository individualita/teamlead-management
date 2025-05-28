import { ChatMessage } from '../types';

import Avatar from '../../../shared/components/Avatar';

interface MessageItemProps {
    currentUserId: string,
    message: ChatMessage,
}
const MessageItem = ({currentUserId, message}: MessageItemProps) => {

    const isMine = message.authorId === currentUserId;

    return (

        <div className={`flex gap-1 items-center mt-3 ${isMine? 'self-end': 'self-start flex-row-reverse'}`}>

            <div className={`flex flex-col relative ${isMine? 'items-end': 'items-start'}`}>

                <p className={`p-3 rounded-xl ${isMine? 'bg-blue-500 text-white': 'bg-gray-200 text-black'}`}>{message.text}</p>

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