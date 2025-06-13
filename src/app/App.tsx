import { Navigate, Routes, Route, } from 'react-router-dom';
import { Suspense, lazy } from 'react';


import { ROUTE_PATHS } from './constants/routePaths';

import Container from '../shared/components/layouts/container/Container';
import { LoadingCircle } from '../shared/components/layouts/loadingCircle/LoadingCircle';

import { ProtectedRoute } from './routes/ProtectedRoute'; 
import { PublicRoute } from './routes/PublicRoute';

import { AuthPagesWrapper } from '../features/auth/routes/AuthPagesWrapper';
import MainLayout from '../shared/components/layouts/mainLayout/MainLayout';
import Employees from '../features/employees/Employees';
import Activity from '../features/activity/Activity';
import Chat from '../features/chat/Chat';
import ProfileSettings from '../features/profile/settings/ProfileSettings';


// Lazy-loaded components

const SignInLazy = lazy(() => import('../features/auth/pages/SignIn'));
const SignUpLazy = lazy(() => import('../features/auth/pages/SignUp'));
const HomeLazy = lazy(() => import('../features/home/Home'));

import './App.css';



const App = () => {

    return (
        <div className='app'>
            <Container>
                <Suspense fallback={<LoadingCircle />}>

                    <Routes>
                        {/* Публичные маршруты (только для НЕ залогиненных пользователей) */}
                        <Route element={<PublicRoute />}>
                            <Route element={<AuthPagesWrapper />}>
                                <Route path={ROUTE_PATHS.SIGN_IN} element={<SignInLazy />} />
                                <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUpLazy />} />      
                            </Route>

                        </Route>
                        
                        {/* Защищённые маршруты (только для залогиненных пользователей) */}
                        <Route element={<ProtectedRoute />}>

                            <Route element={<MainLayout />}>

                                <Route path={ROUTE_PATHS.HOME} element={<HomeLazy />}/>
                                <Route path={ROUTE_PATHS.EMPLOYEES} element={<Employees />} />
                                <Route path={ROUTE_PATHS.ACTIVITY} element={<Activity />} />
                                <Route path={ROUTE_PATHS.CHAT} element={<Chat />} />
                                <Route path={ROUTE_PATHS.SETTINGS} element={<ProfileSettings />} />

                            </Route>

                        </Route>

                        <Route path="*" element={<Navigate to={`/${ROUTE_PATHS.HOME}`}/>} />

                        
                    </Routes>

                </Suspense>

            </Container>
        </div>
    )
};


export default App


