interface ErrorMessageProps {
    message?: string,
    className?: string
}

export const ErrorMessage = ({message = 'Something went wrong', className=''} : ErrorMessageProps) => {

    return (
        <div className={`p-4 text-red-500 ${className}`}>
            <strong>Error:</strong>
                {message}
        </div>
    )
};