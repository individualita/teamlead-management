import { Navigate, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { ROUTES } from '../shared/constants/routes';

import Container from '../shared/components/layouts/Container';
import { LoadingCircle } from '../shared/components/layouts/LoadingCircle';

import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';

import MainLayout from '../shared/components/layouts/mainLayout/MainLayout';
import Employees from '../features/employees/Employees';
import Chat from '../features/chat/Chat';
import ProfileSettings from '../features/profile/settings/ProfileSettings';
import { ErrorResetter } from '../features/auth/components/ErrorResetter';

// Lazy-loaded components

const SignInLazy = lazy(() => import('../features/auth/pages/SignIn'));
const SignUpLazy = lazy(() => import('../features/auth/pages/SignUp'));
const HomeLazy = lazy(() => import('../features/home/Home'));

const App = () => {
    return (
        <div className='app'>
            <ErrorResetter /> {/* Error reset when changing the path */}
            <Container>
                <Suspense fallback={<LoadingCircle />}>
                    <Routes>
                        {/* Публичные маршруты (только для НЕ залогиненных пользователей) */}
                        <Route element={<PublicRoute />}>
                            <Route
                                path={ROUTES.SIGN_IN.path}
                                element={<SignInLazy />}
                            />
                            <Route
                                path={ROUTES.SIGN_UP.path}
                                element={<SignUpLazy />}
                            />
                        </Route>

                        {/* Защищённые маршруты (только для залогиненных пользователей) */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<MainLayout />}>
                                <Route
                                    path={ROUTES.HOME.path}
                                    element={<HomeLazy />}
                                />
                                <Route
                                    path={ROUTES.EMPLOYEES.path}
                                    element={<Employees />}
                                />
                                <Route
                                    path={ROUTES.CHAT.path}
                                    element={<Chat />}
                                />
                                <Route
                                    path={ROUTES.SETTINGS.path}
                                    element={<ProfileSettings />}
                                />
                            </Route>
                        </Route>

                        {/* <Route path="*" element={<Navigate to={`/${ROUTE_PATHS.HOME}`}/>} /> */}
                        <Route
                            path='*'
                            element={<Navigate to={ROUTES.HOME.path} />}
                        />
                    </Routes>
                </Suspense>
            </Container>
        </div>
    );
};

export default App;