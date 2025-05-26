
import { useMessages } from './hooks/useMessages';
import { useAuthStore } from '../auth/store/authStore';

import { ErrorMessage } from '../../shared/components/ErrorMessage';
import MessageList from './components/MessageList';
import ChatForm from './components/ChatForm';

const Chat = () => {

    const {error, messages} = useMessages();

    const {user} = useAuthStore();

    const sortedMessages = [...messages.sort((a, b) => a.timestamp - b.timestamp)];

    if (!user) {
        return <p className='text-center text-red-500'>No user signed in.</p>;
    }

    return (
        <div className='h-full bg-white rounded-xl shadow-lg'>

            <div className='wrapper flex flex-col h-full justify-between p-3'>
                {error && <ErrorMessage message={error}/> }

                <MessageList 
                    messages={sortedMessages} 
                    user={user}
                />

                <ChatForm 
                    user={user}
                />

            </div>

            
        </div>
    )
}

export default Chat;