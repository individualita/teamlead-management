import { useState, useCallback } from 'react';
import { ref,  push} from 'firebase/database';
import { database } from '@/shared/config/firebaseConfig';
import { User } from '@/shared/types';

export const useSendMessage = (user: User) => {

    const [loading, setLoading] = useState(false);

    const send =  useCallback(async (text: string) => {

        const trimmed = text.trim();

        if (!trimmed) return;

        setLoading(true);

        const messagesRef = ref(database, 'messages');

        try {
            await push(messagesRef, {
                text: text,
                timestamp: Date.now(),
                name: user.username,
                photoURL: user.photoURL,
                authorId: user.id  
            });

        } catch (error) {
            console.error('Error sending message:', error);
            throw error;

        }  finally {
            setLoading(false);
        }


    }, [user]);

    return {send, loading}
}