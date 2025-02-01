import { Navigate, Routes, Route } from 'react-router-dom';
import { useEffect, Suspense } from 'react';


import { useAuthStore } from './features/auth/store/authStore';

import { ROUTE_PATHS } from './shared/constants/routePaths';

import Container from './shared/components/Container';

import { ProtectedRoute } from './shared/routes/ProtectedRoute';
import { PublicRoute } from './shared/routes/PublicRote';

import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Home from './features/home/Home';


import './App.css';


const App = () => {

    const { user, listenAuthState, isLoading, isAuthInitialized} = useAuthStore();

    useEffect(() => {

        const unsubscribe = listenAuthState();

        return () => unsubscribe();
    
    }, []);

    console.log('user:', user, 'loading:', isLoading, 'initialized:', isAuthInitialized);

    return (
        <div className='app'>
            <Container>
                <Suspense fallback={<div>loading...</div>}>
                    <Routes>
                        {/* Публичные маршруты (только для НЕ залогиненных пользователей) */}
                        <Route element={<PublicRoute />}>
                            <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn />} />
                            <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp />} />
                        </Route>
                        
                        {/* Защищённые маршруты (только для залогиненных пользователей) */}
                        <Route element={<ProtectedRoute />}>
                            <Route path={ROUTE_PATHS.HOME} element={<Home />} />
                        </Route>

                        <Route path='*' element={<Navigate to={ROUTE_PATHS.HOME} />} />
                        
                    </Routes>

                </Suspense>

            </Container>
        </div>
    )
};


export default App


