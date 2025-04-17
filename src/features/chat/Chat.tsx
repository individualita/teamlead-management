import { getTodos } from './getTodos';
import { useQuery } from '@tanstack/react-query';


const Chat = () => {


    const {isError, data, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
    });

    if (isError) return <div>ошибка</div>
    if (isLoading) return <div>loading....</div>
    return (
        <div>
            <h1>chat</h1>
            {data?.map(todo => <div>{todo.text}</div>)}

        </div>
 

    )
}

export default Chat;