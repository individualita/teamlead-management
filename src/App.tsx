import { Navigate, Routes, Route } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';

import { useAuthStore } from './features/auth/store/authStore';

import { ROUTE_PATHS } from './shared/constants/routePaths';

import Container from './shared/components/Container';


import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Home from './features/home/Home';


import './App.css';


const App = () => {

    const { user, listenAuthState} = useAuthStore();

    useEffect(() => {
        console.log('user:',user)

        listenAuthState();

        return () => listenAuthState();
    
    }, []);

  
    return (
        <div className='app'>
            <Container>
                <Routes>
                    <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn />}/>
                    <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp />}/> 
                    <Route path={ROUTE_PATHS.HOME} element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
                    
                    <Route path="*" element={<Navigate to={ROUTE_PATHS.SIGN_IN} />} />
                </Routes>
            </Container>
        </div>
    )
}

type ProtectedRouteType = {
    children: ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteType) => {
    const {loading, user } = useAuthStore();

    if (loading) return <div>loading...</div>;
    if(!user) return <Navigate to={ROUTE_PATHS.SIGN_IN} /> 

    return children;

}

export default App
