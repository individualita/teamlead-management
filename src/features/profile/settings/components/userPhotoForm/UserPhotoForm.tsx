import { useState, FormEvent } from 'react';
import { Button } from '@mui/material';
//store
import { useAuthUser } from '../../../../../shared/stores/authStore';

import { DEFAULT_URL } from '../../../../../shared/constants/defaultImageUrl';

import { updateUserMessagesPhotoURL } from '../../services/updateUserMessagesPhotoURL';

import { useFirebaseProfileUpdate } from '../../hooks/useFirebaseProfileUpdate';

const UserPhotoForm = () => {
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState<string | null>(null);

    const user = useAuthUser();
    const { update, isLoading } = useFirebaseProfileUpdate();

    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setError(null);

        if (!isValidUrl(photoURL.trim())) {
            setError('Invalid URL. Example: https://example.com');
            return;
        }

        try {
            await update({ photoURL });
            await updateUserMessagesPhotoURL(photoURL, user.id);

            setPhotoURL('');
        } catch (error) {
            console.error('Update failed', error);
            setError('Failed to update. Please try again.');
        }
    };

    return (
        <form aria-label='Change profile picture' onSubmit={handleSubmit}>
            <div className='flex gap-3 relative'>
                <input
                    type='text'
                    value={photoURL}
                    name='photourl'
                    onChange={e => {
                        setPhotoURL(e.target.value);
                        if (error) setError(null);
                    }}
                    className={`
                        border border-gray-300 rounded-lg px-2 py-2
                        text-base
                        focus:outline-none focus:ring-1 focus:ring-blue-700 focus:border-transparent
                        hover:border-gray-400
                        placeholder-gray-400 placeholder:text-sm
                        transition-all duration-200
                    `}
                    placeholder='Past image link here'
                    required
                />
                {error && (
                    <span className='absolute -bottom-7 text-red-500'>
                        {error}
                    </span>
                )}
                <Button
                    type='submit'
                    variant='contained'
                    color='success'
                    size='small'
                    disabled={isLoading}
                    title='Change image'
                    aria-label='Change user image'
                >
                    {isLoading ? 'Changing...' : 'Change'}
                </Button>

                <button
                    type='button'
                    className='
                        p-2 bg-gray-200 rounded-md uppercase text-[13px] cursor-pointer transition
                        hover:bg-gray-300 '
                    onClick={() => setPhotoURL(DEFAULT_URL)}
                    title='Generate default link'
                    aria-label='set default URL user image'
                >
                    Default URL
                </button>
            </div>
        </form>
    );
};

export default UserPhotoForm;
