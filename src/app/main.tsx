import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppProviders from './providers/AppProviders.tsx'

import '../index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    /*
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>,*/

    <AppProviders >
        <App />
    </AppProviders>
)
