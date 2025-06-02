import { useState, FormEvent } from 'react';
import { ref,  push} from 'firebase/database';
import { database } from '../../../shared/config/firebaseConfig';
import { ImTelegram } from 'react-icons/im';
import { FaTelegramPlane } from "react-icons/fa";


import { toast } from 'react-toastify';


//types
import { User } from '../../../shared/types';

interface ChatFormProps {
    user: User
}

const ChatForm = ({user}: ChatFormProps) => {

    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const notify = () => toast("Error!");

    console.log('loading', loading);

    const sendMessage = async () => {

        setLoading(true);
        const messagesRef = ref(database, 'messages');

        try {
            await push(messagesRef, {
                text: text,
                timestamp: Date.now(),
                name: user?.username || 'Anonymous',
                photoURL: user?.photoURL || null,
                authorId: user?.id  
            })

        } catch (error) {
            notify();
            console.error('Error sending message:', error);
            alert('Could not send your message. Please check your connection and try again.');

        }  finally {
            setLoading(false);
        }


    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        sendMessage();
        setText('');

    };
    
    return (
        <div className='form'>

            <form onSubmit={handleSubmit}>

                <div className='group flex gap-1 justify-between p-3 bg-gray-50 rounded-xl relative'>
                    
                    <input 
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        placeholder='Type something...'
                    />


                    <button
                        type='submit' 
                        className='p-1 hover:scale-105 transition duration-300 ease-in-out cursor-pointer disabled:opacity-50'
                        disabled={loading || !text.trim()} 
                    >
                        <FaTelegramPlane  className='w-7 h-7 text-[var(--color-primary)]'/>
                    </button>


                    
                </div>

            </form>
        </div>
    )
}

export default ChatForm;