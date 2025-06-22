import { useState, FormEvent } from 'react';
import { useSendMessage } from '../../hooks/useSendMessage';

import { FaTelegramPlane } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';

//types
import { User } from '../../../../shared/types';

interface ChatFormProps {
    user: User;
}

const ChatForm = ({ user }: ChatFormProps) => {
    const [text, setText] = useState('');

    const { send, loading } = useSendMessage(user);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await send(text);
            setText('');
        } catch {
            alert(
                'Could not send your message. Please check your connection and try again.',
            );
        }
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='group flex gap-1 justify-between p-3 bg-gray-50 rounded-xl relative'>
                    <input
                        type='text'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        placeholder='Type something...'
                    />

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <button
                            type='submit'
                            className='p-1 hover:scale-105 transition duration-300 ease-in-out cursor-pointer disabled:opacity-50'
                            disabled={loading || !text.trim()}
                        >
                            <FaTelegramPlane className='w-7 h-7 text-[var(--color-primary)]' />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ChatForm;
