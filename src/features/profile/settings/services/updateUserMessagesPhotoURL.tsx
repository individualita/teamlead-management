import { ref, query, orderByChild, equalTo, get, update } from 'firebase/database';
import { database } from '@/shared/config/firebaseConfig';


export const updateUserMessagesPhotoURL  = async (photoURL: string, userId: string) => {

    try {
        const messagesRef = ref(database, 'messages');

        const userMessagesQuery = query(messagesRef, orderByChild('authorId'), equalTo(userId));

        const snapshot = await get(userMessagesQuery);

        if (snapshot.exists()) {
            const updates: { [key: string]: any } = {};

            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;

                updates[`${childKey}/photoURL`] = photoURL;
            });

            await update(messagesRef, updates);
        }
    } catch (error) {
        console.error('Error updating messages:', error);
        throw error;
    }

};

