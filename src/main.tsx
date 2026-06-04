import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error));
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Toaster position="top-center" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid rgba(255,255,255,.12)', borderRadius: '18px' } }} />
    </HashRouter>
  </React.StrictMode>
);
