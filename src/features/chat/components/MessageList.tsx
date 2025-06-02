import { useRef, useEffect } from 'react';
import dayjs from 'dayjs';


import { ChatMessage } from '../types';

import EmptyChatState from './EmptyChatState';
import MessageItem from './MessageItem';

interface MessageListProps {
    messages: ChatMessage[],
    currentUserId: string,
}

const MessageList = ({messages, currentUserId}: MessageListProps) => {

    const chatRef  = useRef<HTMLUListElement>(null);

    useEffect(() => {

        if (chatRef.current) {
            const lastElement = chatRef.current.lastElementChild;

            lastElement?.scrollIntoView({behavior: 'smooth'});
        }
        
    }, [messages.length]);


    //test

    //отсортировать сообщения по дате??


    const sortedMessagesByDate = () => {
        const timeStampsArray = messages.map(msg => msg.timestamp);

        const sortedByTimestamp = [...timeStampsArray].sort((a, b) => a - b);

        console.log(sortedByTimestamp);

    };

    sortedMessagesByDate();





    return (
        <ul className='chat py-4 flex flex-col gap-2 overflow-y-scroll h-120 max-h-120' ref={chatRef}>

            {messages.length? messages.map((msg, index) => (
                <MessageItem 
                    key={index}
                    currentUserId={currentUserId} 
                    message={msg} 
                />
            )) : (
                <EmptyChatState />
            )}
        </ul>
    )
}

export default MessageList;