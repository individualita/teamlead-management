import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../../shared/clients/queryClient';
import { ReactNode } from 'react';

import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './AuthProvider';


const AppProviders = ({children}: {children: ReactNode}) => {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </Router>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )

}

export default AppProviders;