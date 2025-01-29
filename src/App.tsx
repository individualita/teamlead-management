import { Navigate, Routes, Route } from 'react-router-dom';

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
                    <Route path='/login' element={<SignIn />}/>
                    <Route path='/signup' element={<SignUp />}/> 
                    <Route path='/home' element={<Home />}/>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Container>
        </div>
    )
}


export default App
