import { create, StateCreator } from 'zustand';

import { ChatMessage } from '../types';

interface MessagesInitialState {
    messages: ChatMessage[];
}

interface MessagesActions {
    setMessages: (messages: ChatMessage[]) => void;
}

interface MessagesState extends MessagesInitialState, MessagesActions {}

const messagesStore: StateCreator<MessagesState> = set => ({
    messages: [],
    setMessages: messages => set({ messages }),
});

const useMessagesStore = create(messagesStore);
//selectors
export const useMessagesList = () => useMessagesStore(state => state.messages);

//action creators
export const setMessages = (messages: ChatMessage[]) => useMessagesStore.getState().setMessages(messages);
