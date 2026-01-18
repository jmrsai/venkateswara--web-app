import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global Error Handler for Production Debugging
window.onerror = function (msg, url, line, col, error) {
    console.error("GLOBAL ERROR CAPTURED:", msg, url, line, col, error);
    const errorContainer = document.getElementById('root');
    if (errorContainer) {
        errorContainer.innerHTML = `
            <div style="padding: 40px; color: #721c24; background: #fffbf0; border: 4px solid #721c24; font-family: sans-serif; border-radius: 20px; margin: 20px;">
                <h1 style="margin: 0 0 20px 0;">Divine Intervention Required</h1>
                <p>The application encountered a sacred runtime error.</p>
                <pre style="background: #f8d7da; padding: 20px; border-radius: 10px; overflow: auto; max-height: 400px; font-size: 14px;">
${msg}\nat ${url}:${line}:${col}\n\n${error?.stack || 'No stack trace'}
                </pre>
                <button onclick="window.location.reload()" style="background: #721c24; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Re-invocate Application</button>
            </div>
        `;
    }
    return false;
};

try {
    const container = document.getElementById('root');
    if (!container) throw new Error("Root container not found");

    console.log("Root container found, initiating render...");
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
    console.log("Render call completed.");
} catch (e: any) {
    console.error("Critical Render Error:", e);
    // Force show error on screen if caught
    const errorContainer = document.getElementById('root');
    if (errorContainer) {
        errorContainer.innerHTML = `<h1 style="color:red">Render Error: ${e.message}</h1><pre>${e.stack}</pre>`;
    }
}
