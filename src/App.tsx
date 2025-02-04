import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

import { useAuthStore } from './features/auth/store/authStore';

import { ROUTE_PATHS } from './shared/constants/routePaths';

import Container from './shared/components/Container';
import { LoadingCircle } from './shared/components/LoadingCircle';

import { ProtectedRoute } from './shared/routes/ProtectedRoute';
import { PublicRoute } from './shared/routes/PublicRote';

import './App.css';


// Lazy-loaded components

const SignInLazy = lazy(() => import('./features/auth/pages/SignIn'));
const SignUpLazy = lazy(() => import('./features/auth/pages/SignUp'));
const HomeLazy = lazy(() => import('./features/home/Home'));



const App = () => {

    const { user, listenAuthState, isLoading, isAuthInitialized,  setErrorMessage} = useAuthStore();
    const {pathname} = useLocation();

    useEffect(() => {

        const unsubscribe = listenAuthState();

        return () => unsubscribe();
    
    }, [listenAuthState]);

    // Clear message errors when changing routes
    useEffect(() => {
        setErrorMessage(null);
    }, [pathname]);

    console.log('user:', user, 'loading:', isLoading, 'initialized:', isAuthInitialized);

    return (
        <div className='app'>
            <Container>
                <Suspense fallback={<LoadingCircle />}>
                    <Routes>
                        {/* Публичные маршруты (только для НЕ залогиненных пользователей) */}
                        <Route element={<PublicRoute />}>
                            <Route path={ROUTE_PATHS.SIGN_IN} element={<SignInLazy />} />
                            <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUpLazy />} />
                        </Route>
                        
                        {/* Защищённые маршруты (только для залогиненных пользователей) */}
                        <Route element={<ProtectedRoute />}>
                            <Route path={ROUTE_PATHS.HOME} element={<HomeLazy />} />
                        </Route>

                        <Route path='*' element={<Navigate to={ROUTE_PATHS.HOME} />} />
                        
                    </Routes>

                </Suspense>

            </Container>
        </div>
    )
};


export default App


