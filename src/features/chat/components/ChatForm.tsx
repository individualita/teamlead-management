import { useState, FormEvent } from 'react';
import { ref,  push} from 'firebase/database';
import { database } from '../../../shared/config/firebaseConfig';
import { ImTelegram } from 'react-icons/im';

//types
import { User } from '../../../shared/types';

interface ChatFormProps {
    user: User
}

const ChatForm = ({user}: ChatFormProps) => {

    const [text, setText] = useState('');

    const sendMessage = async () => {

        const messagesRef = ref(database, 'messages');

        try {
            await push(messagesRef, {
                text: text,
                timestamp: Date.now(),
                name: user?.username || 'Anonymous',
                photoURL: user?.photoURL || null,
                id: user?.id  
            })

            setText('');

        } catch (error) {
            console.error('Error sending message:', error);
            alert('Could not send your message. Please check your connection and try again.');
        }   


    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        sendMessage();
    };
    

    return (
        <div className='form'>

            <form onSubmit={handleSubmit}>

                <div className='group flex gap-1 justify-between p-3 bg-gray-50 rounded-xl'>

                    <input 
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        placeholder='Type something...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                    />

                    <button
                        type='submit' 
                        className='rounded-full text-white  hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer' 
                    >
                        <ImTelegram  className='w-10 h-10 text-indigo-600 '/>
                    </button>

                </div>


            </form>
        </div>
    )
}

export default ChatForm;