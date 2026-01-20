import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global Error Handler for Production Debugging (Console-only to avoid React corruption)
window.onerror = function (msg, url, line, col, error) {
    console.error("GLOBAL ERROR CAPTURED:", msg, url, line, col, error);
    return false;
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
