import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../clients/queryClient';
import { ReactNode } from 'react';


const AppProviders = ({children}: {children: ReactNode}) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )

}

export default AppProviders;