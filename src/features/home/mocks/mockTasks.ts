import { Task } from '../types/task';


export const MOCK_TASKS: Task[] = [
    
    {
        id: '1',
        title: 'Prepare project proposal',
        description: 'Create a detailed proposal document for the new client project, including timelines and deliverables.',
        status: 'To Do',
        priority: 'High',
        completed: false,
    },

    {
        id: '2',
        title: 'Team meeting',
        description: 'Schedule and lead the weekly sync-up meeting with the development team.',
        status: 'In Progress',
        priority: 'Medium',
        completed: false,
    },

    {
        id: '3',
        title: 'Update landing page',
        description: 'Collaborate with the design team to implement new content on the marketing landing page.',
        status: 'To Do',
        priority: 'Low',
        completed: false,

    },

    {
        id: '4',
        title: 'Fix login bug',
        description: 'Investigate and resolve the reported issue preventing some users from logging in.',
        status: 'In Progress',
        priority: 'High',
        completed: false,

    },

    {
        id: '5',
        title: 'Finalize Q2 report',
        description: 'Review data and prepare the final version of the quarterly performance report.',
        status: 'Done',
        priority: 'Medium',
        completed: true,

    },

    {
        id: '6',
        title: 'Client feedback review',
        description: 'Go through the feedback from the last sprint demo and list action points for improvements.',
        status: 'Done',
        priority: 'Low',
        completed: true,

    },

    {
        id: '7',
        title: 'Update project documentation',
        description: 'Revise and update the README and API documentation to reflect recent changes.',
        status: 'Done',
        priority: 'High',
        completed: true,
        
    }
    
];



