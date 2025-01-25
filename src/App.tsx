import { Navigate, Routes, Route } from 'react-router-dom';

import AuthForm from './features/auth/components/AuthForm';
import Container from './components/Container';
import './App.css';



const App = () => {
    return (
        <div className='app'>
            <Container>
                <Routes>
                    <Route path='/login' element={<AuthForm />}/>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
