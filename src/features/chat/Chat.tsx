import { useMessages } from './hooks/useMessages';
import { useAuthUser } from '@/shared/stores/authStore';

//shared components
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { LoadingCircle } from '@/shared/components/layouts/LoadingCircle';

//feature components
import MessageList from './components/MessageList';
import ChatForm from './components/ChatForm';


const Chat = () => {
    const { error, loading, messages } = useMessages();

    const user = useAuthUser();

    const sortedMessages = [...messages].sort(
        (a, b) => a.timestamp - b.timestamp,
    );

    if (!user) {
        return <p className='text-center text-red-500'>No user signed in.</p>;
    }

    if (loading) return <LoadingCircle />;

    return (
        <div className='h-[70vh] bg-white rounded-xl shadow-lg'>
            <div className='wrapper flex flex-col h-full justify-between p-3'>
                {error && <ErrorMessage message={error} />}

                <MessageList
                    messages={sortedMessages}
                    currentUserId={user.id}
                />

                <ChatForm user={user} />
            </div>
        </div>
    );
};

export default Chat;
