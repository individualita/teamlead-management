import { getTodos } from './getTodos';
import { useQuery } from '@tanstack/react-query';
import { FormEvent, useState, useEffect, Fragment } from 'react';
import { database } from '../../shared/config/firebaseConfig';
import { getDatabase, ref, set, push, get, child, onValue} from 'firebase/database';
import { date } from 'zod';
import helloImg from './hello_nobg.png'
import { Timestamp } from 'firebase/firestore';
import { ImTelegram } from 'react-icons/im';


import { useAuthStore } from '../auth/store/authStore';
import Avatar from '../../shared/components/Avatar';
const URL = 'https://console.firebase.google.com/u/0/project/teamlead-management/database/teamlead-management-default-rtdb/data/~2F?hl=ru';


interface Message {
    id: string,
    name: string,
    photoURL: string,
    text: string,
    timestamp: Date
}

const Chat = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');


    const {user} = useAuthStore();

    console.log('user:', user);

    //enter send message
    const sendMessage = () => {

        const messagesRef = ref(database, 'messages');

        push(messagesRef, {
            text: text,
            timestamp: Date.now(),
            name: user?.username || 'Anonymous',
            photoURL: user?.photoURL || null,
            id: user?.id  
        })

        setText('');
        console.log('sended');
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendMessage();
    }


    const dbRef = ref(getDatabase());

    console.log(user?.id);
    const getMessagesData = async () => {

        try {

            const snapshot = await get(child(dbRef, 'messages'));

            const data: Message[] = Object.values(snapshot.val());
            setMessages(data);
            console.log(messages);
        } catch (error) {
            console.error(error);
        }

    }

    const getMessages =  () => {

        const messagesRef = ref(database, 'messages');

        onValue(messagesRef, (snapshot) => {
            const data: Message[] = Object.values(snapshot.val());

            console.log('data:', data);
            setMessages(data);
        });
    };


    useEffect(() => {
        getMessages();
    }, [])


    return (
        <div className='h-full bg-white rounded-xl shadow-lg'>

            <div className='wrapper flex flex-col h-full justify-between p-3'>

                <div className='chat py-4 flex flex-col gap-2'>
                    {messages.length? messages.map(mess => (
                        
                        <div className={`flex gap-1 items-center mt-3 ${user?.id === mess.id? 'self-end': 'self-start flex-row-reverse'}`}>



                            <div className={`flex flex-col relative ${user?.id === mess.id? 'items-end': 'items-start'}`}>

                                <p className={`p-3 rounded-xl ${user?.id === mess.id? 'bg-blue-500 text-white': 'bg-gray-200 text-black'}`}>{mess.text}</p>

                                <span className='text-[9px] text-gray-500 absolute -bottom-4'>
                                    {new Date(mess.timestamp).toLocaleTimeString()}
                                </span>

                            </div>

                            <div className='h-8 w-8'>
                                <Avatar src={mess.photoURL} username={mess.name}/>
                            </div>


                        </div>


                    )) : (
                        <div className='flex justify-center items-center h-full'>
                            <div className='p-8 bg-gray-100 rounded-xl flex flex-col'>
                                <span>Сообщений пока нет... </span>
                                <span>Напиши что-то по-братски.</span> 
                                <img src={helloImg} alt="" className='w-30 h-30'/>

                            </div>
                        </div>
                    )}
                </div>

                <div className='form'>

                    <form onSubmit={handleSubmit}>

                        <div className='group flex gap-1 justify-between p-3 bg-gray-50 rounded-xl'>

                            <input 
                                type='text'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                placeholder='Type something...'
                            />

                            <button
                                type='submit' 
                                className='rounded-full text-white  hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer' 
                            >
                                <ImTelegram  className='w-10 h-10 text-indigo-600 '/>
                            </button>

                        </div>


                    </form>
                </div>

            </div>

            
        </div>
    )
}

export default Chat;