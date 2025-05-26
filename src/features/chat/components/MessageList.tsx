import EmptyChatState from './EmptyChatState';
import MessageItem from './MessageItem';

import { Message } from '../hooks/useMessages';
import { User } from '../../auth/types/user';

interface MessageListProps {
    messages: Message[],
    user: User
}

const MessageList = ({messages, user}: MessageListProps) => {
    return (
        <div className='chat py-4 flex flex-col gap-2'>

            {messages.length? messages.map((msg, index) => (
                <MessageItem 
                    key={index}
                    user={user} 
                    message={msg} 
                />

            )) : (
                <EmptyChatState />
            )}
        </div>
    )
}

export default MessageList;