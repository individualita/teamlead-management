import { create } from 'zustand';

import { ChatMessage } from '../types';

interface MessagesState {
    messages: ChatMessage[],
    setMessages: (messages: ChatMessage[]) => void,
}

export const useMessagesStore = create<MessagesState>((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),

}));
