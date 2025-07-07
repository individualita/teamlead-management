import { CircularProgress } from '@mui/material';

export const LoadingCircle = () => (
    <div
        className='flex items-center justify-center h-dvh'
        role='status'
        aria-label='loading'
    >
        <CircularProgress size={60} />
    </div>
);
