import { useState, FormEvent } from 'react';
import { Button } from '@mui/material';
//store
import { useAuthUser } from '../../../../shared/stores/authStore';

import { DEFAULT_URL } from '../../../../shared/constants/defaultImageUrl';

import { updateUserMessagesPhotoURL } from '../services/updateUserMessagesPhotoURL';

import { useFirebaseProfileUpdate } from '../hooks/useFirebaseProfileUpdate';

//styles
import '../styles/profileSettings.css';

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
            <div className='flex flex-col md:flex-row gap-3 relative'>
                <input
                    type='text'
                    value={photoURL}
                    name='photourl'
                    onChange={e => {
                        setPhotoURL(e.target.value);
                        if (error) setError(null);
                    }}
                    className='profile-settings-input focus-input'
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

                <Button
                    onClick={() => setPhotoURL(DEFAULT_URL)}
                    type='button'
                    variant='contained'
                    size='small'
                    disabled={isLoading}
                    title='Generate default link'
                    aria-label='set default URL user image'
                    sx={{background: 'var(--color-inactive)'}}
                >
                    {isLoading ? 'Changing...' : 'Default'}
                </Button>

            </div>
        </form>
    );
};

export default UserPhotoForm;
