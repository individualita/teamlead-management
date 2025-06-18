import { useEffect, useState, useCallback } from 'react';
import { ALERT_TIMEOUT } from '../constants/alertTimeout';

export const useAutoDismissAlert = (timeout: number = ALERT_TIMEOUT) => {
    const [alertMessage, setAlertMessage] = useState<string>('');

    const showAlert = useCallback((message: string) => {
        setAlertMessage(message);
    }, []);

    //alert
    useEffect(() => {
        if (!alertMessage) return;

        const timer = setTimeout(() => {
            setAlertMessage('');
        }, timeout);

        return () => clearTimeout(timer);
    }, [alertMessage]);

    return {alertMessage,  showAlert}
};
