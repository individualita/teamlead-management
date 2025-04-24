export const ErrorMessage = ({message = 'Something went wrong'} : {message?: string}) => {

    return (
        <div className='p-4 text-red-500'>
            Error: <strong>{message}</strong>
        </div>
    )
}