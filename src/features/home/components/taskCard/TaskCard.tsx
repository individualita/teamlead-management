import { Task } from '../../types/task';


interface TaskCardProps {
    task: Task,
}


const TaskCard = ({task}: TaskCardProps) => {
    return (
        <article className="mb-4 bg-white rounded-lg shadow-sm p-4">

            <header className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{task.title}</h3>

                <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    {task.priority}
                </span>
            </header>

            <p className="text-sm text-gray-600 mt-2">
                {task.description}
            </p>

            <footer className="mt-3 flex items-center justify-between text-sm">

                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                    <div className="w-6 h-6 bg-green-400 rounded-full"></div>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                </div>

                <div className="text-gray-500">
                    <span>12 comments • 0 files</span>
                </div>

            </footer>
        </article>
    )
}

export default TaskCard;