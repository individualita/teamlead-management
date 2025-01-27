import { Navigate, Routes, Route } from 'react-router-dom';

import Container from './components/Container';

import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
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
