import { ChatMessage } from '../types';

import EmptyChatState from './EmptyChatState';
import MessageItem from './MessageItem';

interface MessageListProps {
    messages: ChatMessage[],
    currentUserId: string,
}

const MessageList = ({messages, currentUserId}: MessageListProps) => {
    return (
        <div className='chat py-4 flex flex-col gap-2'>

            {messages.length? messages.map((msg, index) => (
                <MessageItem 
                    key={index}
                    currentUserId={currentUserId} 
                    message={msg} 
                />

            )) : (
                <EmptyChatState />
            )}
        </div>
    )
}

export default MessageList;