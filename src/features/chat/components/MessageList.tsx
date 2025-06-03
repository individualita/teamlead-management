import { useRef, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';

import { ChatMessage } from '../types';

import EmptyChatState from './EmptyChatState';
import MessageItem from './MessageItem';

interface MessageListProps {
    messages: ChatMessage[],
    currentUserId: string,
}

const MessageList = ({messages, currentUserId}: MessageListProps) => {

    const endMessageRef  = useRef<HTMLUListElement>(null);

    useEffect(() => {

        if (endMessageRef.current) {
            const lastElement = endMessageRef.current.lastElementChild;

            lastElement?.scrollIntoView({behavior: 'smooth'});
        }
        
    }, [messages.length]);


    const messagesByDate = [...messages].reduce((acc: Record<string, ChatMessage[]>, message) => {

        const dateKey = dayjs(message.timestamp).format('DD-MMM-YYYY');

        if (!acc[dateKey]) acc[dateKey] = [];

        acc[dateKey].push(message);

        return acc;

    }, {});


    return (
        <ul className='chat py-4 flex flex-col gap-2 overflow-y-scroll h-120 max-h-120' ref={endMessageRef}>

            {/* {messages.length? messages.map((msg, index) => (
                <MessageItem 
                    key={index}
                    currentUserId={currentUserId} 
                    message={msg} 
                />
            )) : (
                <EmptyChatState />
            )}  */}

            {Object.entries(messagesByDate).map(([dateKey, dailyMessages]) => (
                <Fragment key={dateKey}>
                    <div className=' py-2 text-center text-sm opacity-60 select-none'>{dateKey}</div>

                    {dailyMessages.map((msg, i) => (
                        <MessageItem
                            key={i}
                            currentUserId={currentUserId}
                            message={msg}
                        />
                    ))}

                </Fragment>
            ))}


        </ul>
    )
}

export default MessageList;