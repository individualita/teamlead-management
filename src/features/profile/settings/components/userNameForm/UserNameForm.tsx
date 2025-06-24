import { useState, FormEvent } from 'react';
import { Button } from '@mui/material';
import { FaPencil } from 'react-icons/fa6';

import { useFirebaseProfileUpdate } from '../../hooks/useFirebaseProfileUpdate';

interface EditUserNameFormProps {
    currentName: string;
}
const UserNameForm = ({ currentName }: EditUserNameFormProps) => {
    const [name, setName] = useState(currentName);
    const [isNameUpdating, setIsNameUpdating] = useState(false);

    const { update, isLoading } = useFirebaseProfileUpdate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await update({ displayName: name });
        setName(name);
        setIsNameUpdating(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col'
            aria-label='edit username'
        >
            <div className='flex gap-3 items-center rounded-md relative'>
                <input
                    type='text'
                    value={name}
                    name='username'
                    onChange={e => setName(e.target.value)}
                    className={`
                        ${isNameUpdating ? 'border' : 'border-none'}
                        border-gray-300 rounded-lg px-2 py-2
                        text-base
                        focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
                        hover:border-gray-400
                        disabled:opacity-80 disabled:text-lg disabled:font-bold
                        placeholder-gray-400 
                        transition-all duration-200
                    `}
                    placeholder='Enter your name'
                    disabled={!isNameUpdating}
                    required
                />

                {isNameUpdating ? (
                    <div className='flex gap-3'>
                        <Button
                            type='submit'
                            variant='contained'
                            color='success'
                            size='medium'
                            disabled={isLoading}
                            aria-label='Save username'
                            title='Save username'
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>

                        <Button
                            type='button'
                            onClick={() => {
                                setIsNameUpdating(false);
                                setName(currentName);
                            }}
                            variant='text'
                            color='warning'
                            size='medium'
                            aria-label='Cancel editing'
                            title='Cancel editing'
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <button
                        type='button'
                        className='absolute right-2 cursor-pointer'
                        onClick={() => setIsNameUpdating(true)}
                        aria-label='Edit username'
                    >
                        <FaPencil className='text-base' title='Edit name' />
                    </button>
                )}
            </div>
        </form>
    );
};

export default UserNameForm;
