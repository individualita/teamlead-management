import { useState, useEffect } from 'react';
import { database } from '../../../shared/config/firebaseConfig';
import { ref,  onValue} from 'firebase/database';

export interface Message {
    id: string,
    name: string,
    photoURL: string,
    text: string,
    timestamp: number
};


export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const messagesRef = ref(database, 'messages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            setError(null);

            const val = snapshot.val();
            const data: Message[] = val ? Object.values(val) : [];
            setMessages(data);
        }, (error) => {
            setError('Failed to load messages. Please try again later.');
            console.error(error);
        });

        //clear
        return () => unsubscribe();
        
    }, []);

    return {messages, error}
};