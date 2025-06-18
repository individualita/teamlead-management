import { useState, useEffect } from 'react';
import { database } from '../../../shared/config/firebaseConfig';
import { ref,  onValue} from 'firebase/database';

//store
import { useMessagesList, setMessages } from '../store/messagesStore';

import { ChatMessage } from '../types';

export const useMessages = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    //store
    const messages = useMessagesList();

    useEffect(() => {

        const messagesRef = ref(database, 'messages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            setError(null);

            const val = snapshot.val();
            const data: ChatMessage[] = val ? Object.values(val) : [];
            setMessages(data);
            setLoading(false); 
        }, (error) => {
            setError('Failed to load messages. Please try again later.');
            console.error(error);
            setLoading(false); 
        });

        //clear
        return () => unsubscribe();
        
    }, []);

    return {messages, error, loading }
};