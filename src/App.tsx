import { Navigate, Routes, Route } from 'react-router-dom';

import { ROUTE_PATHS } from './shared/constants/routePaths';

import Container from './shared/components/Container';


import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Home from './features/home/Home';

import './App.css';



const App = () => {
    return (
        <div className='app'>
            <Container>
                <Routes>
                    <Route path={ROUTE_PATHS.SIGN_IN} element={<SignIn />}/>
                    <Route path={ROUTE_PATHS.SIGN_UP} element={<SignUp />}/> 
                    <Route path={ROUTE_PATHS.HOME} element={<Home />}/>
                    <Route path="*" element={<Navigate to={ROUTE_PATHS.SIGN_IN} />} />
                </Routes>
            </Container>
        </div>
    )
}


export default App
