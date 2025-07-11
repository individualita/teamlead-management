import { useRef, useEffect, useMemo, Fragment } from 'react';

import { ChatMessage } from '../types';

import { groupMessagesByDate } from '../utils/groupMessagesByDate';

import EmptyChatState from './EmptyChatState';
import MessageItem from './MessageItem';

interface MessageListProps {
    messages: ChatMessage[];
    currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
    const endMessageRef = useRef<HTMLDivElement>(null);

    const messagesGroupedByDate = useMemo(
        () => groupMessagesByDate(messages),
        [messages],
    );

    const dateMessageGroups = Object.entries(messagesGroupedByDate);


    useEffect(() => {
        if (endMessageRef.current) {
            const lastElement = endMessageRef.current.lastElementChild;

            lastElement?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    return (
        <div
            className='chat py-4 flex flex-col gap-2 overflow-y-scroll h-full'
            ref={endMessageRef}
            aria-label='Chat messages'
        >
            {messages.length === 0 && <EmptyChatState />}

            {dateMessageGroups.map(([dateKey, dailyMessages]) => (
                <Fragment key={dateKey}>
                    <div
                        role='separator'
                        className='py-2 text-center text-sm opacity-60 select-none'
                    >
                        {dateKey}
                    </div>

                    {dailyMessages.map((msg, i) => (
                        <MessageItem
                            key={`${msg.timestamp}${i}`}
                            currentUserId={currentUserId}
                            message={msg}
                        />
                    ))}
                </Fragment>
            ))}
        </div>
    );
};

export default MessageList;
