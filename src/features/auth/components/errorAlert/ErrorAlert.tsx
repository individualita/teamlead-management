import { Alert } from '@mui/material';

type ErrorAlertProps = {
    errorMessage?: string,
}

const ErrorAlert = ({errorMessage}: ErrorAlertProps) => {

    if (!errorMessage) return null;

    return (
        <Alert severity='error'>
            <strong>Error:</strong> {''}
            {errorMessage}
        </Alert>
    )
}

export default ErrorAlert;