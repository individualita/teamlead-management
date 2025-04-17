interface Task {
    id: string,
    text: string,
    done: boolean
}
const tasks = [
    {
        id: '1',
        text: 'dasd',
        done: true,
    },

    {
        id: '2',
        text: 'second',
        done: false,
    },

    {
        id: '3',
        text: 'thjird',
        done: true,
    }
]



export const getTodos = () => {

    return new Promise<Task[]>(resolve => {

        setTimeout(() => {
            resolve(tasks)
        }, 3000);
    })

}