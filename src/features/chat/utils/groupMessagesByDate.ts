import { ChatMessage } from '../types';
import dayjs from 'dayjs';

export const groupMessagesByDate = (messages: ChatMessage[])  => {
    
    return messages.reduce((acc: Record<string, ChatMessage[]>, message) => {

        const dateKey = dayjs(message.timestamp).format('DD-MMM-YYYY');

        if (!acc[dateKey]) acc[dateKey] = [];

        acc[dateKey].push(message);

        return acc;

    }, {});

};